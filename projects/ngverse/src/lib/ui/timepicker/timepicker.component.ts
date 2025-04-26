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
import { PartSelectorComponent } from '@/ui/timepicker/part-selector/part-selector.component';
import { injectDpDateAdapter } from '@/ui/datepicker/adapter/date.token';
import { CdkTrapFocus } from '@angular/cdk/a11y';

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
    PartSelectorComponent,
    FormsModule,
    CdkTrapFocus,
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
  disabled = signal(false);
  hours = signal<number>(0);
  minutes = signal<number>(0);
  selectedTime = signal<string>('');

  private _onTouched: OnTouchedFunction;
  private _onChangeFn: OnChangeFunction;

  /*Because we work with date object we will keep the passed date and modify only the time part*/
  private originalModelValue: unknown | null | undefined;
  private readonly elementRef = inject(ElementRef);
  private timepickerContainer = viewChild<ElementRef>('timepickerContainer');
  private readonly _dateAdapter = injectDpDateAdapter();

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

  // If passed value is date, we will set hours and minutes otherwise will use the current date
  writeValue(value: Date | null | undefined): void {
    this.originalModelValue = value;
    if (value instanceof Date) {
      this.hours.set(this._dateAdapter.getHours(value));
      this.minutes.set(this._dateAdapter.getMinutes(value));
    } else {
      const now = this._dateAdapter.currentDate();
      this.hours.set(this._dateAdapter.getHours(now));
      this.minutes.set(this._dateAdapter.getMinutes(now));
      this.originalModelValue = now;
    }
  }

  onDocumentClick(event: Event) {
    if (!this.isClickInside(event)) {
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
      const now = this._dateAdapter.currentDate();
      this.hours.set(this._dateAdapter.getHours(now));
      this.minutes.set(this._dateAdapter.getMinutes(now));
      this.updateModel();
    }
  }

  // Parse and sets hours and minutes
  updateTimeOnInput($event: Event) {
    const value = ($event.target as HTMLInputElement)?.value.trim() ?? '';

    if (isValidTime(value)) {
      const [hours, minutes] = value.split(':');
      this.hours.set(parseInt(hours));
      this.minutes.set(parseInt(minutes));
      this.updateModel();
    }
  }

  // Checks if minutes are between 0 and 59 and sets them
  updateMinutes(minutes: number) {
    if (minutes < 0) {
      minutes = 59;
    } else if (minutes > 59) {
      minutes = 0;
    }
    this.minutes.set(minutes);
    this.selectedTime.set(`${this.hours()}:${minutes}`);
    this.updateModel();
  }

  // Checks if hours are between 0 and 23 and sets them
  updateHours(hours: number) {
    if (hours < 0) {
      hours = 23;
    } else if (hours > 23) {
      hours = 0;
    }
    this.hours.set(hours);
    this.selectedTime.set(`${hours}:${this.minutes()}`);
    this.updateModel();
  }

  // Clones the original date and sets hours and minutes and then updates the ngModel with the new date
  private updateModel() {
    const originalDate = this.originalModelValue;
    if (originalDate) {
      let clonedDate = this._dateAdapter.clone(originalDate);
      clonedDate = this._dateAdapter.setHours(clonedDate, this.hours());
      clonedDate = this._dateAdapter.setMinutes(clonedDate, this.minutes());
      this._onChangeFn?.(clonedDate);
    }
  }

  // Checks if the click is inside the input or inside the container
  private isClickInside(event: Event) {
    return (
      this.elementRef.nativeElement.contains(event.target) ||
      this.timepickerContainer()?.nativeElement.contains(event.target)
    );
  }
}
