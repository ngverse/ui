import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { A11yAlertDirective } from '@ngverse/kit';

type ALERT_TYPES = 'success' | 'danger' | 'warning' | 'default';
type ALERT_VARIANT_TYPES = 'fill' | 'outline';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '[type(), variant()]',
  },
  hostDirectives: [A11yAlertDirective],
})
export class AlertComponent {
  type = input<ALERT_TYPES>('default');
  variant = input<ALERT_VARIANT_TYPES>('fill');
}
