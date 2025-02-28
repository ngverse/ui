import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { A11yCheckboxDirective, A11yIconDirective } from '@ngverse/kit';
import { CheckboxIconComponent } from './checkbox-icon.component';

type VALUE_TYPE = boolean | undefined | null;

type OnChangeFunction = ((_: unknown) => void) | undefined;

type OnTouchedFunction = (() => void) | undefined;

type ValidatorChangeFunction = (() => void) | undefined;

type LABEL_ALIGN = 'start' | 'end';

@Component({
  selector: 'app-checkbox',
  imports: [CheckboxIconComponent, A11yCheckboxDirective, A11yIconDirective],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css',
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
  host: {
    '[class.disabled]': 'disabled()',
    '[class.checked]': 'value()',
    '[class.start]': 'labelAlign() === "start"',
  },
})
export class CheckboxComponent implements ControlValueAccessor, Validator {
  labelAlign = input<LABEL_ALIGN>('end');
  required = input<boolean>(false);

  value = signal<VALUE_TYPE>(undefined);
  disabled = signal<boolean>(false);

  private _registerOnChangefn: OnChangeFunction;
  private _onTouchedfn: OnTouchedFunction;
  private _validatorChangefn: ValidatorChangeFunction;

  constructor() {
    effect(() => {
      this.required();
      this._validatorChangefn?.();
    });
  }

  toggle() {
    this._onTouchedfn?.();
    const newValue = !this.value();
    this.value.set(newValue);
    this._registerOnChangefn?.(newValue);
  }

  writeValue(obj: unknown): void {
    this.value.set(!!obj);
  }
  registerOnChange(fn: OnChangeFunction): void {
    this._registerOnChangefn = fn;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._validatorChangefn = fn;
  }

  registerOnTouched(fn: OnTouchedFunction): void {
    this._onTouchedfn = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  validate(control: AbstractControl<boolean>): ValidationErrors | null {
    const hasRequiredValidator = this.required();

    return hasRequiredValidator && control.value !== true
      ? { required: true }
      : null;
  }
}
