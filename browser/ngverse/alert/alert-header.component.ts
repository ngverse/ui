import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-alert-header',
  imports: [],
  template: `<ng-content></ng-content> `,
  styles: `
    :host {
      font-weight: 500;
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertHeaderComponent {}
