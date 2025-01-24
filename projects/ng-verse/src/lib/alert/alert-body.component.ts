import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-alert-body',
  imports: [],
  template: `<ng-content></ng-content> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertBodyComponent {}
