import { Injectable, signal } from '@angular/core';
import { RadioButtonComponent } from './radio-button.component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
export type OnTouchedFunction = (() => void) | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
export type OnChangeFunction = ((_: unknown) => void) | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
export type ValidatorChangeFunction = (() => void) | undefined;

export type CompareWith = (o1: unknown, o2: unknown) => boolean;

@Injectable()
export class RadioButtonState {
  private _radioButtons = new Set<RadioButtonComponent>();
  private _value = signal<unknown>(undefined);
  name = signal<string>('');

  registerOnChange: OnChangeFunction;
  validatorChangeFn: ValidatorChangeFunction;
  onTouched: OnTouchedFunction;
  compareWith: CompareWith = (o1, o2) => o1 === o2;

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

  setName(name: string) {
    this.name.set(name);
  }

  getValue() {
    return this._value();
  }
}
