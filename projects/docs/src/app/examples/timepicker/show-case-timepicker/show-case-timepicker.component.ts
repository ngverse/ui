import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { TimepickerComponent } from '@/ui/timepicker/timepicker.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { provideDpDateAdapter } from '@/ui/datepicker/adapter/date.token';
import { DpDateAdapter } from '@/ui/datepicker/adapter/date.adapter';

class JsDateAdapter implements DpDateAdapter<unknown> {
  addDay(date: unknown, day: number): Date {
    const d = new Date(date as Date);
    d.setDate(d.getDate() + day);
    return d;
  }

  clone(date: unknown): Date {
    return new Date((date as Date).getTime());
  }

  createDate(year: number, month: number, date: number): Date {
    return new Date(year, month, date);
  }

  currentDate(): Date {
    return new Date();
  }

  daysInMonth(date: unknown): number {
    const d = new Date(date as Date);
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  }

  endOfMonth(date: unknown): Date {
    const d = new Date(date as Date);
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
  }

  endOfWeek(date: unknown): Date {
    const d = new Date(date as Date);
    const day = d.getDay();
    const diff = 6 - day;
    d.setDate(d.getDate() + diff);
    return d;
  }

  format(date: unknown, formatStr: string): string {
    const d = new Date(date as Date);

    const map: Record<string, string | number> = {
      YYYY: d.getFullYear(),
      MM: String(d.getMonth() + 1).padStart(2, '0'),
      DD: String(d.getDate()).padStart(2, '0'),
      HH: String(d.getHours()).padStart(2, '0'),
      mm: String(d.getMinutes()).padStart(2, '0'),
      ss: String(d.getSeconds()).padStart(2, '0'),
    };

    return formatStr.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) =>
      map[match].toString()
    );
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const formatter = new Intl.DateTimeFormat('en-US', { weekday: style });
    const baseDate = new Date(Date.UTC(2021, 5, 6)); // Sunday
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      return formatter.format(date);
    });
  }

  getHours(date: unknown): number {
    return new Date(date as Date).getHours();
  }

  getMinutes(date: unknown): number {
    return new Date(date as Date).getMinutes();
  }

  isBefore(date1: unknown, date2: unknown): boolean {
    return (
      new Date(date1 as Date).getTime() < new Date(date2 as Date).getTime()
    );
  }

  isSame(date1: unknown, date2: unknown): boolean {
    return (
      new Date(date1 as Date).getTime() === new Date(date2 as Date).getTime()
    );
  }

  month(date: unknown): number {
    return new Date(date as Date).getMonth();
  }

  setHours(date: unknown, hours: number): Date {
    const d = new Date(date as Date);
    d.setHours(hours);
    return d;
  }

  setMinutes(date: unknown, minutes: number): Date {
    const d = new Date(date as Date);
    d.setMinutes(minutes);
    return d;
  }

  startOfMonth(date: unknown): Date {
    const d = new Date(date as Date);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }

  startOfWeek(date: unknown): Date {
    const d = new Date(date as Date);
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    return d;
  }
}

@Component({
  selector: 'doc-show-case-timepicker',
  imports: [TimepickerComponent, FormsModule, DatePipe],
  templateUrl: './show-case-timepicker.component.html',
  styleUrl: './show-case-timepicker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideDpDateAdapter(new JsDateAdapter())],
})
export class ShowCaseTimepickerComponent {
  time = model<Date | null | undefined>();
}
