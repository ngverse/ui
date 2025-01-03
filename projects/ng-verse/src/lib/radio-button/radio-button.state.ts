import { Injectable, InputSignal, signal } from '@angular/core';
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
  name!: InputSignal<string>;
  compareWith!: InputSignal<CompareWith>;
  disabled = signal(false);
  registerOnChange: OnChangeFunction;
  validatorChangeFn: ValidatorChangeFunction;
  onTouched: OnTouchedFunction;

  add(radioButton: RadioButtonComponent) {
    this._radioButtons.add(radioButton);
  }
  remove(radioButton: RadioButtonComponent) {
    this._radioButtons.delete(radioButton);
  }

  setValue(value: unknown) {
    this._value.set(value);
    if (this.registerOnChange) {
      this.registerOnChange(this._value());
    }
  }

  writeValue(value: unknown) {
    this._value.set(value);
  }

  getValue() {
    return this._value();
  }
}
