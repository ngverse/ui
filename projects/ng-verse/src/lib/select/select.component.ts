import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
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
import { CompareWith, OnChangeFunction, SelectState } from './select.state';

type OnTouchedFunction = (() => void) | undefined;

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ControlValueAccessor {
  stretch = input<boolean>(false);

  placeholder = input.required<string>();

  compareWith = input<CompareWith>((o1: unknown, o2: unknown) => o1 === o2);

  private _onTouched: OnTouchedFunction;

  state = inject(SelectState);

  multiple = input(false);

  options = contentChildren(OptionComponent, { descendants: true });

  listbox = viewChild.required(ListboxDirective);

  selectButton = viewChild('selectButton', {
    read: ElementRef<HTMLElement>,
  });

  writeValue(value: unknown): void {
    this.state.writeValue(value);
  }
  registerOnChange(fn: OnChangeFunction): void {
    this.state.registerOnChange = fn;
  }

  registerOnTouched(fn: OnTouchedFunction): void {
    this._onTouched = fn;
  }

  constructor() {
    this.state.multiple = this.multiple;
    this.state.options = this.options;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.state.disabled.set(isDisabled);
  }

  panelOpened() {
    this.listbox().focus();

    const selectedOptionIndex = this.state.firstSelectedOptionIndex();
    this.listbox().activateItemOrFirstByIndex(selectedOptionIndex);
    this.state.isOpen.set(true);
  }

  toggle() {
    this.state.isOpen.update((isOpen) => !isOpen);
  }

  panelClosed() {
    this._onTouched?.();
  }
}
