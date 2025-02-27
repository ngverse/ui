import { Directive, inject, input } from '@angular/core';
import { A11yAccordionDirective } from './accordion.directive';

@Directive({
  selector: 'button[ktA11yAccordionTitle]',
  host: {
    '[attr.aria-controls]': 'panelId',
    '[attr.aria-expanded]': 'a11yIsExpanded()',
    '[id]': 'id',
  },
})
export class A11yAccordionTitleDirective {
  a11yIsExpanded = input.required<boolean>();

  private accordion = inject(A11yAccordionDirective);

  readonly panelId = this.accordion.panelId;
  readonly id = this.accordion.titleId;
}
