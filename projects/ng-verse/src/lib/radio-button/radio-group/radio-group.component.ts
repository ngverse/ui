import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  inject,
  input,
  signal
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonComponent } from '../radio-button.component';
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent implements ControlValueAccessor {
  radioButtons = contentChildren<RadioButtonComponent>(RadioButtonComponent);
  value = signal<unknown>(undefined);

  compareWith = input<CompareWith>((o1, o2) => o1 === o2);

  name = input(getInputName());

  direction = input<'horizontal' | 'vertical'>('horizontal');

  private _state = inject(RadioButtonState);

  constructor() {
    this._state.name = this.name;
    this._state.compareWith = this.compareWith;
  }

  writeValue(value: unknown): void {
    this._state.writeValue(value);
  }

  registerOnChange(fn: OnChangeFunction): void {
    this._state.registerOnChange = fn;
  }
  registerOnTouched(fn: OnTouchedFunction): void {
    this._state.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this._state.disabled.set(isDisabled);
  }
}
