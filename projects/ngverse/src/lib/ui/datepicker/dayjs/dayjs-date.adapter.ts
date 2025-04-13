import { DpDateAdapter } from '@ngverse/datepicker';
import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
dayjs.extend(localeData);

export class DpDayjsDateAdapter implements DpDateAdapter<Dayjs> {
  isSame(date1: dayjs.Dayjs, date2: dayjs.Dayjs): boolean {
    return date1.isSame(date2);
  }
  isBefore(date1: dayjs.Dayjs, date2: dayjs.Dayjs): boolean {
    return date1.isBefore(date2);
  }
  format(date: dayjs.Dayjs, format: string): string {
    return date.format(format);
  }
  currentDate(): Dayjs {
    return dayjs();
  }
  clone(date: Dayjs): Dayjs {
    return date.clone();
  }
  startOfMonth(date: Dayjs): Dayjs {
    return date.startOf('month');
  }
  endOfMonth(date: Dayjs): Dayjs {
    return date.endOf('month');
  }
  startOfWeek(date: Dayjs): Dayjs {
    return date.startOf('week');
  }
  endOfWeek(date: Dayjs): Dayjs {
    return date.endOf('week');
  }
  month(date: Dayjs): number {
    return date.get('month');
  }
  addDay(date: Dayjs, day: number): Dayjs {
    return date.add(day, 'day');
  }
  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (style === 'long') {
      return dayjs.weekdays();
    }
    if (style === 'short') {
      return dayjs.weekdaysShort();
    }
    return dayjs.weekdaysMin();
  }
  createDate(year: number, month: number, date: number) {
    return dayjs(new Date(year, month, date));
  }

  daysInMonth(date: Dayjs): number {
    return date.daysInMonth();
  }
}
