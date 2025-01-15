import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-footer',
  template: ` <ng-content></ng-content> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFooterComponent {}
