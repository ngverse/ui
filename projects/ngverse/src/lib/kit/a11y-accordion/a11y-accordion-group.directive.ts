import { Directive } from '@angular/core';
import { provideParentOrNew } from '../utils/provide-parent-or-new';
import { A1yyAccordionStack } from './a11y-accordion.stack';

@Directive({
  selector: '[appA11yAccordionGroup]',
  providers: [
    {
      provide: A1yyAccordionStack,
      useFactory: () => provideParentOrNew(A1yyAccordionStack),
    },
  ],
  host: {
    class: 'a11y-accordion-group',
  },
})
export class A11yAccordionGroupDirective {}
