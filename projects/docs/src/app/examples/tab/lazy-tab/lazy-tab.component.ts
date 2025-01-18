import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'doc-lazy-tab',
  imports: [DatePipe],
  templateUrl: './lazy-tab.component.html',
  styleUrl: './lazy-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyTabComponent {
  time = new Date();
}
