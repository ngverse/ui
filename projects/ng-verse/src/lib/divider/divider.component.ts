import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-divider',
  imports: [],
  template: ``,
  styleUrl: './divider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.vertical]': 'vertical()',
  },
})
export class DividerComponent {
  vertical = input(false);
}
