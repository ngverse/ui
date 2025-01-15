import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-content',
  template: ` <ng-content></ng-content> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardContentComponent {}
