import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-alert-header',
  imports: [],
  templateUrl: './alert-header.component.html',
  styleUrl: './alert-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertHeaderComponent {}
