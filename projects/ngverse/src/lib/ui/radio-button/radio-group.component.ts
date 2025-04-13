import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type OnTouchedFunction = (() => void) | undefined;
export type OnChangeFunction = ((_: unknown) => void) | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CompareWith = (o1: any, o2: any) => boolean;

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
  compareWith = input<CompareWith>((o1, o2) => o1 === o2);
  name = input(inject(_IdGenerator).getId('radio-group-'));
  vertical = input<boolean>(false);

  value = signal<unknown>(undefined);

  disabled = signal(false);

  private registerOnChangefn: OnChangeFunction;
  private onTouchedfn: OnTouchedFunction;

  writeValue(value: unknown): void {
    this.value.set(value);
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

  selected(value: unknown) {
    this.value.set(value);
    this.registerOnChangefn?.(this.value());
    this.onTouchedfn?.();
  }
}
