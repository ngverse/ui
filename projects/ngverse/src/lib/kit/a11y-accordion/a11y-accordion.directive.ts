import { _IdGenerator } from '@angular/cdk/a11y';
import { Directive, inject } from '@angular/core';

@Directive({
  selector: '[appA11yAccordion]',
  host: {
    class: 'a11y-accordion',
  },
})
export class A11yAccordionDirective {
  private idGenerator = inject(_IdGenerator);

  panelId = this.idGenerator.getId('a11y-accordion-panel-');
  titleId = this.idGenerator.getId('a11y-accordion-title-');
}
