import { Directive, inject } from '@angular/core';
import { A11yAccordionDirective } from './a11y-accordion.directive';

@Directive({
  selector: '[appA11yAccordionPanel]',
  host: {
    '[id]': 'id',
    class: 'a11y-accordion-panel',
    role: 'region',
    '[attr.aria-labelledby]': 'titleId',
  },
})
export class A11yAccordionPanelDirective {
  private accordion = inject(A11yAccordionDirective);

  id = this.accordion.panelId;
  titleId = this.accordion.titleId;
}
