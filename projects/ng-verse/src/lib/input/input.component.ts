import { Component, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OnChangeFunction = ((_: any) => void) | undefined;

type OnTouchedFunction = (() => void) | undefined;

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  value = signal<string | undefined>(undefined);
  type = input<string>();
  readonly = input<boolean>();
  placeholder = input<string>();

  disabled = signal<boolean | undefined>(undefined);

  private _registerOnChange: OnChangeFunction;
  private _onTouched: OnTouchedFunction;

  writeValue(obj: string): void {
    this.value.set(obj);
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: OnChangeFunction): void {
    this._registerOnChange = fn;
  }

  registerOnTouched(fn: OnTouchedFunction): void {
    this._onTouched = fn;
  }

  blur() {
    if (this._onTouched) {
      this._onTouched();
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
    // throw new Error('Method not implemented.');
  }

  onInput($event: Event) {
    const target = $event.target as HTMLInputElement;

    this.value.set(target.value);
    this.emitChange();
  }

  private emitChange() {
    if (this._registerOnChange) {
      this._registerOnChange(this.value());
    }
  }
}
