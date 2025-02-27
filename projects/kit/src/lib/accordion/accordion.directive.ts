import { _IdGenerator } from '@angular/cdk/a11y';
import { Directive, inject } from '@angular/core';

@Directive({
  selector: '[ktA11yAccordion]',
})
export class A11yAccordionDirective {
  private idGenerator = inject(_IdGenerator);

  panelId = this.idGenerator.getId('kt-a11y-accordion-panel-');
  titleId = this.idGenerator.getId('kt-a11y-accordion-title-');
}
