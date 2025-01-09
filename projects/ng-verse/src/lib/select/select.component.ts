import {
  Component,
  contentChildren,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

import { ListboxDirective } from '@ng-verse/listbox/listbox.directive';
import { ListboxState } from '@ng-verse/listbox/listbox.state';
import { PopoverOriginDirective } from '@ng-verse/popover/popover-origin.directive';
import { PopoverComponent } from '@ng-verse/popover/popover.component';
import { OptionComponent } from './option/option.component';
import { SelectIconComponent } from './select-icon.component';
import { SelectState } from './select.state';

type OnTouchedFunction = (() => void) | undefined;

type OnChangeFunction = ((_: unknown) => void) | undefined;

type CompareWith = (o1: unknown, o2: unknown) => boolean;

@Component({
  selector: 'app-select',
  imports: [
    ReactiveFormsModule,
    SelectIconComponent,
    PopoverOriginDirective,
    PopoverComponent,
    ListboxDirective,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent,
    },
    SelectState,
    ListboxState,
  ],
})
export class SelectComponent implements ControlValueAccessor {
  stretch = input<boolean>(false);

  placeholder = input.required<string>();

  compareWith = input<CompareWith>((o1: unknown, o2: unknown) => o1 === o2);

  private _registerOnChange: OnChangeFunction;
  private _onTouched: OnTouchedFunction;

  selectState = inject(SelectState);

  options = contentChildren(OptionComponent, { descendants: true });

  listbox = viewChild.required(ListboxDirective);

  selectButton = viewChild('selectButton', {
    read: ElementRef<HTMLElement>,
  });

  writeValue(value: unknown): void {
    this.selectState.writeValue(value);
  }
  registerOnChange(fn: OnChangeFunction): void {
    this._registerOnChange = fn;
  }

  registerOnTouched(fn: OnTouchedFunction): void {
    this._onTouched = fn;
  }

  constructor() {
    effect(() => {
      const options = this.options();
      this.selectState.options.set(options);
    });
  }

  setDisabledState?(isDisabled: boolean): void {
    this.selectState.disabled.set(isDisabled);
  }

  panelOpened() {
    this.listbox().focus();
    const selectedOptionIndex = this.selectState.selectedOptionIndex();
    this.listbox().activateItemOrFirstByIndex(selectedOptionIndex);
    this.selectState.isOpen.set(true);
  }

  toggle() {
    this.selectState.isOpen.update((isOpen) => !isOpen);
  }

  panelClosed() {
    if (this._onTouched) {
      this._onTouched();
    }
  }
}
