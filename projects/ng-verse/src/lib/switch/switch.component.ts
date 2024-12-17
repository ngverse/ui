import {
  ChangeDetectionStrategy,
  Component,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OnChangeFunction = ((_: any) => void) | undefined;

type OnTouchedFunction = (() => void) | undefined;

type ValidatorChangeFunction = (() => void) | undefined;

type VALUE_TYPE = boolean | undefined | null;

@Component({
  selector: 'app-switch',
  imports: [],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SwitchComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: SwitchComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchComponent implements ControlValueAccessor, Validator {
  value = signal<VALUE_TYPE>(undefined);

  private _registerOnChange: OnChangeFunction;
  private _onTouched: OnTouchedFunction;

  disabled = model<boolean>(false);

  writeValue(obj: boolean | undefined | null): void {
    this.value.set(obj);
  }
  registerOnChange(fn: OnChangeFunction): void {
    this._registerOnChange = fn;
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
    const hasRequired = control.hasValidator(Validators.required);
    return hasRequired && control.value !== true ? { required: true } : null;
  }
}
