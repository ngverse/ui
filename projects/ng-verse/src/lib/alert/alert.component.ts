import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ALERT_TYPES = 'success' | 'danger' | 'warning' | 'none';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'alert',
    '[class]': 'type()',
  },
})
export class AlertComponent {
  type = input<ALERT_TYPES>('none');
}
