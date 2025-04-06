import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { InputDirective } from '@/ui/input/input.directive';
import { PopoverComponent } from '@/ui/popover/popover.component';
import { PopoverOriginDirective } from '@/ui/popover/popover-origin.directive';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ValueSelectorComponent } from '@/ui/timepicker/value-selector/value-selector.component';

type OnTouchedFunction = (() => void) | undefined;

export type OnChangeFunction = ((_: unknown) => void) | undefined;

function isValidTime(time: string) {
  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(time);
}

@Component({
  selector: 'app-timepicker',
  imports: [
    InputDirective,
    PopoverComponent,
    PopoverOriginDirective,
    ValueSelectorComponent,
    FormsModule,
  ],
  templateUrl: './timepicker.component.html',
  styleUrl: './timepicker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TimepickerComponent,
    },
  ],
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class TimepickerComponent implements ControlValueAccessor {
  placeholder = input<string>();

  isOpen = signal(false);

  private _onTouched: OnTouchedFunction;
  private _onChangeFn: OnChangeFunction;

  disabled = signal(false);

  hours = signal<number>(0);
  minutes = signal<number>(0);

  selectedTime = signal<string>('');

  private modelValue: Date | null | undefined;

  private readonly elementRef = inject(ElementRef);
  private timepickerContainer = viewChild<ElementRef>('timepickerContainer');

  togglePanel() {
    this.isOpen.update((isOpen) => !isOpen);
  }

  openPanel() {
    this.isOpen.set(true);
  }

  panelClosed() {
    this._onTouched?.();
  }

  registerOnChange(fn: OnChangeFunction): void {
    this._onChangeFn = fn;
  }

  registerOnTouched(fn: OnTouchedFunction): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  writeValue(value: Date | null | undefined): void {
    this.modelValue = value;
    if (value instanceof Date) {
      this.hours.set(value.getHours());
      this.minutes.set(value.getMinutes());
    } else {
      const now = new Date();
      this.hours.set(now.getHours());
      this.minutes.set(now.getMinutes());
    }
  }

  onDocumentClick(event: Event) {
    if (
      !this.elementRef.nativeElement.contains(event.target) &&
      !this.timepickerContainer()?.nativeElement.contains(event.target)
    ) {
      this.isOpen.set(false);
    }
  }

  onBlur($event: Event) {
    const value = ($event.target as HTMLInputElement)?.value.trim() ?? '';

    if (isValidTime(value)) {
      const [hours, minutes] = value.split(':');
      this.hours.set(parseInt(hours));
      this.minutes.set(parseInt(minutes));
    } else {
      this.selectedTime.set('');
      const now = new Date();
      this.hours.set(now.getHours());
      this.minutes.set(now.getMinutes());
      this.updateModel();
    }
  }

  updateTime($event: Event) {
    const value = ($event.target as HTMLInputElement)?.value.trim() ?? '';

    if (isValidTime(value)) {
      const [hours, minutes] = value.split(':');
      this.hours.set(parseInt(hours));
      this.minutes.set(parseInt(minutes));
      this.updateModel();
    }
  }

  updateMinutes(minutes: number) {
    this.minutes.set(minutes);
    this.selectedTime.set(`${this.hours()}:${minutes}`);
    this.updateModel();
  }

  updateHours(hours: number) {
    this.hours.set(hours);
    this.selectedTime.set(`${hours}:${this.minutes()}`);
    this.updateModel();
  }

  private updateModel() {
    const originalDate = this.modelValue;
    if (originalDate) {
      const clonedDate = new Date(originalDate.getTime());
      clonedDate.setHours(this.hours());
      clonedDate.setMinutes(this.minutes());
      this._onChangeFn?.(clonedDate);
    }
  }
}
