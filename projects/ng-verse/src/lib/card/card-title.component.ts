import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-title',
  imports: [],
  template: '<ng-content></ng-content>',
  styles: [
    `
      :host {
        font-weight: 600;
        font-size: 18px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTitleComponent {}
