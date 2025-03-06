import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'doc-lazy-tab',
  templateUrl: './lazy-tab.component.html',
  styleUrl: './lazy-tab.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyTabComponent {
  time = new Date();
}
