import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appA11yAccordionHeader]',
  host: {
    role: 'heading',
    '[attr.aria-level]': 'ariaLevel()',
    class: 'a11y-accordion-header',
  },
})
export class A11yAccordionHeaderDirective {
  ariaLevel = input<string | undefined>('3');
}
