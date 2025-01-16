import {
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

type OnChangeFunction = ((_: unknown) => void) | undefined;

type OnTouchedFunction = (() => void) | undefined;

type VALUE_TYPE = boolean | undefined | null;

type ValidatorChangeFunction = (() => void) | undefined;

let switchId = 0;

function genId() {
  return `switch-${switchId++}`;
}

type LABEL_ALIGN = 'start' | 'end';

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
  host: {
    '[class.disabled]': 'disabled()',
    '[class.checked]': 'value()',
    '[class.start]': 'labelAlign() === "start"',
  },
})
export class SwitchComponent implements ControlValueAccessor, Validator {
  labelAlign = input<LABEL_ALIGN>('end');
  disabled = model<boolean>(false);
  required = input<boolean>(false);
  id = input(genId());
  value = signal<VALUE_TYPE>(undefined);

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
    if (this.disabled()) {
      return;
    }
    this._onTouchedfn?.();
    const newValue = !this.value();
    this.value.set(newValue);
    this._registerOnChangefn?.(newValue);
  }

  writeValue(obj: boolean | undefined | null): void {
    this.value.set(obj);
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
    const hasRequiredValidator =
      this.required() || control.hasValidator(Validators.required);
    return hasRequiredValidator && control.value !== true
      ? { required: true }
      : null;
  }
}
