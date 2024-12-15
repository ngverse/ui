import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { RadioButtonComponent } from '../radio-button.component';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import {
  CompareWith,
  OnChangeFunction,
  OnTouchedFunction,
  RadioButtonState,
} from '../radio-button.state';

let inputName = 0;

function getInputName() {
  return `radio-group-${inputName++}`;
}

@Component({
  selector: 'app-radio-group',
  imports: [],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RadioGroupComponent,
    },
    RadioButtonState,
    {
      provide: NG_VALIDATORS,
      useExisting: RadioGroupComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent implements ControlValueAccessor, Validator {
  radioButtons = contentChildren<RadioButtonComponent>(RadioButtonComponent);
  value = signal<unknown>(undefined);

  compareWith = input<CompareWith>();
  required = input(undefined, { transform: booleanAttribute });

  name = input(getInputName());

  direction = signal<'horizontal' | 'vertical'>('horizontal');

  constructor() {
    effect(() => {
      this._state.setName(this.name());
    });

    effect(() => {
      const compareWith = this.compareWith();
      if (compareWith) {
        this._state.compareWith = compareWith;
      }
    });
  }
  validate(control: AbstractControl<boolean>): ValidationErrors | null {
    const hasRequired =
      this.required() || control.hasValidator(Validators.required);
    return (hasRequired && control.value === undefined) ||
      control.value === null
      ? { required: true }
      : null;
  }
  registerOnValidatorChange?(fn: () => void): void {}

  private _state = inject(RadioButtonState);

  writeValue(value: unknown): void {
    this._state.writeValue(value);
  }

  registerOnChange(fn: OnChangeFunction): void {
    this._state.registerOnChange = fn;
  }
  registerOnTouched(fn: OnTouchedFunction): void {
    this._state.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}
}
