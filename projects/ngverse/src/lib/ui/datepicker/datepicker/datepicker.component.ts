import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.css',
  imports: [CalendarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent {}
