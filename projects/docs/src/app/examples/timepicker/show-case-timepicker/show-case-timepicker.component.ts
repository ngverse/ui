import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { TimepickerComponent } from '@/ui/timepicker/timepicker.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'doc-show-case-timepicker',
  imports: [TimepickerComponent, FormsModule, DatePipe],
  templateUrl: './show-case-timepicker.component.html',
  styleUrl: './show-case-timepicker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCaseTimepickerComponent {
  time = model<Date | null | undefined>();
}
