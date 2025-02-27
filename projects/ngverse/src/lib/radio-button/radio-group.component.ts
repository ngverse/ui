import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SingleValueModel, ValueModelCompareWith } from '@ngverse/kit';

let inputName = 0;

function getInputName() {
  return `radio-group-${inputName++}`;
}

export type OnTouchedFunction = (() => void) | undefined;
export type OnChangeFunction = ((_: unknown) => void) | undefined;

@Component({
  selector: 'app-radio-group',
  imports: [],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RadioGroupComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent implements ControlValueAccessor {
  compareWith = input<ValueModelCompareWith, ValueModelCompareWith>(
    (o1: unknown, o2: unknown) => o1 === o2,
    {
      transform: (value) => {
        this._valueModel.setCompareWith(value);
        return value;
      },
    }
  );
  name = input(getInputName());
  vertical = input<boolean>(false);

  private _valueModel = new SingleValueModel();

  disabled = signal(false);

  private registerOnChangefn: OnChangeFunction;
  private onTouchedfn: OnTouchedFunction;

  writeValue(value: unknown): void {
    this._valueModel.setValue(value);
  }

  isSelected(value: unknown) {
    return this._valueModel.isSelected(value);
  }

  registerOnChange(fn: OnChangeFunction): void {
    this.registerOnChangefn = fn;
  }
  registerOnTouched(fn: OnTouchedFunction): void {
    this.onTouchedfn = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  select(value: unknown) {
    this._valueModel.setValue(value);
    this.registerOnChangefn?.(this._valueModel.value());
    this.onTouchedfn?.();
  }
}
