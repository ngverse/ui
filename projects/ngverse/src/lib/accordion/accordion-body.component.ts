import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-accordion-body',
  template: `<ng-content> </ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionBodyComponent {}
