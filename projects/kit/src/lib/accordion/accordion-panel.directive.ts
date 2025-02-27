import { Directive, inject } from '@angular/core';
import { A11yAccordionDirective } from './accordion.directive';

@Directive({
  selector: '[ktA11yAccordionPanel]',
  host: {
    '[id]': 'id',
    class: 'kt-a11y-accordion-panel',
    role: 'region',
    '[attr.aria-labelledby]': 'titleId',
  },
})
export class A11yAccordionPanelDirective {
  private accordion = inject(A11yAccordionDirective);

  id = this.accordion.panelId;
  titleId = this.accordion.titleId;
}
