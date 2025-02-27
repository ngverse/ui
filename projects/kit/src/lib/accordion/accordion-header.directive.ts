import { Directive, input } from '@angular/core';

@Directive({
  selector: '[ktA11yAccordionHeader]',
  host: {
    role: 'heading',
    '[attr.aria-level]': 'a11yAriaLevel()',
  },
})
export class A11yAccordionHeaderDirective {
  a11yAriaLevel = input<string>('3');
}
