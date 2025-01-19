import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';

import { ListboxDirective } from '../listbox/listbox.directive';
import { ListboxState } from '../listbox/listbox.state';
import { PopoverOriginDirective } from '../popover/popover-origin.directive';
import { PopoverComponent } from '../popover/popover.component';
import { OptionComponent } from './option.component';
import { SelectIconComponent } from './select-icon.component';
import { CompareWith, OnChangeFunction, SelectState } from './select.state';

type OnTouchedFunction = (() => void) | undefined;
type ValidatorChangeFunction = (() => void) | undefined;

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
    {
      provide: NG_VALIDATORS,
      useExisting: SelectComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ControlValueAccessor, Validator {
  stretch = input<boolean>(false);
  multiple = input(false);
  required = input(false);
  placeholder = input.required<string>();
  compareWith = input<CompareWith>((o1: unknown, o2: unknown) => o1 === o2);

  private _onTouched: OnTouchedFunction;

  state = inject(SelectState);

  private _validatorChangeFn: ValidatorChangeFunction;

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
    effect(() => {
      this.required();
      this._validatorChangeFn?.();
    });
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

  validate(control: AbstractControl<boolean>): ValidationErrors | null {
    const hasRequired = control.hasValidator(Validators.required);
    if (!hasRequired) {
      return null;
    }
    const values = this.state.values();
    const anyNotEmpty = values?.some(
      (v) => v !== null && v !== undefined && v !== ''
    );
    if (anyNotEmpty) {
      return null;
    }
    return { required: true };
  }

  toggle() {
    this.state.isOpen.update((isOpen) => !isOpen);
  }

  panelClosed() {
    this._onTouched?.();
  }
}
