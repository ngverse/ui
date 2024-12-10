import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  model,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { CheckboxIconComponent } from './checkbox-icon.component';

type VALUE_TYPE = boolean | undefined | null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
type OnTouchedFunction = (() => void) | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
type OnChangeFunction = ((_: any) => void) | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
type ValidatorChangeFunction = (() => void) | undefined;

@Component({
  selector: 'app-checkbox',
  imports: [CheckboxIconComponent],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CheckboxComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: CheckboxComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements ControlValueAccessor, Validator {
  value = signal<VALUE_TYPE>(undefined);

  private _registerOnChange: OnChangeFunction;
  private _validatorChangeFn: ValidatorChangeFunction;
  private _onTouched: OnTouchedFunction;

  required = input(undefined, { transform: booleanAttribute });
  disabled = model<boolean>(false);

  constructor() {
    effect(() => {
      const _ = this.required();
      if (this._validatorChangeFn) {
        this._validatorChangeFn();
      }
    });
  }

  writeValue(obj: boolean | undefined | null): void {
    this.value.set(obj);
  }
  registerOnChange(fn: OnChangeFunction): void {
    this._registerOnChange = fn;
  }
  registerOnValidatorChange(fn: ValidatorChangeFunction): void {
    this._validatorChangeFn = fn;
  }

  registerOnTouched(fn: OnTouchedFunction): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  toggle() {
    if (this.disabled()) {
      return;
    }
    if (this._onTouched) {
      this._onTouched();
    }
    const newValue = !this.value();
    this.value.set(newValue);
    if (this._registerOnChange) {
      this._registerOnChange(newValue);
    }
  }

  validate(control: AbstractControl<boolean>): ValidationErrors | null {
    const hasRequired =
      this.required() || control.hasValidator(Validators.required);
    return hasRequired && control.value !== true ? { required: true } : null;
  }
}
