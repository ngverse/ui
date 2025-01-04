import { Injectable, signal } from '@angular/core';
import { RadioButtonComponent } from './radio-button.component';

export type OnTouchedFunction = (() => void) | undefined;
export type OnChangeFunction = ((_: unknown) => void) | undefined;
export type ValidatorChangeFunction = (() => void) | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CompareWith = (o1: any, o2: any) => boolean;

@Injectable()
export class RadioButtonState {
  private _radioButtons = new Set<RadioButtonComponent>();
  private _value = signal<unknown>(undefined);
  name = signal<string>('');
  disabled = signal(false);
  registerOnChange: OnChangeFunction;
  validatorChangeFn: ValidatorChangeFunction;
  onTouched: OnTouchedFunction;
  compareWith = signal<CompareWith>((o1, o2) => o1 === o2);

  add(radioButton: RadioButtonComponent) {
    this._radioButtons.add(radioButton);
  }
  remove(radioButton: RadioButtonComponent) {
    this._radioButtons.delete(radioButton);
  }

  selected(value: unknown) {
    this._value.set(value);
    if (this.registerOnChange) {
      this.registerOnChange(this._value());
    }
    if (this.onTouched) {
      this.onTouched();
    }
  }

  writeValue(value: unknown) {
    this._value.set(value);
  }

  getValue() {
    return this._value();
  }
}
