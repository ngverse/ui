import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-year-view',
  imports: [],
  templateUrl: './year-view.component.html',
  styleUrl: './year-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearViewComponent {
  yearSelected = output<number>();
  year = input<number | null>();
}
