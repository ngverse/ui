import { Directive } from '@angular/core';

@Directive({
  selector: '[appA11yAccordionGroup]',

  host: {
    class: 'a11y-accordion-group',
  },
})
export class A11yAccordionGroupDirective {}
