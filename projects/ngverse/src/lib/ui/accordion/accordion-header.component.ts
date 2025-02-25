import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-accordion-header',
  template: `<ng-content> </ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionHeaderComponent {}
