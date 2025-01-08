import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ALERT_TYPES = 'default' | 'success' | 'danger' | 'warning';

@Component({
  selector: 'app-alert',
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AlertComponent {
  type = input<ALERT_TYPES>('default');
}
