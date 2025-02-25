import { Directive, ElementRef, inject, input, output } from '@angular/core';
import { A11yAccordionDirective } from './a11y-accordion.directive';

@Directive({
  selector: '[appA11yAccordionTitle]',
  host: {
    '(click)': 'toggled.emit()',
    '[attr.aria-controls]': 'panelId',
    '[attr.aria-expanded]': 'isExpanded()',
    class: 'a11y-accordion-title',
    '[id]': 'id',
  },
})
export class A11yAccordionTitleDirective {
  private element = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>)
    .nativeElement;
  private accordion = inject(A11yAccordionDirective);

  panelId = this.accordion.panelId;
  id = this.accordion.titleId;

  isExpanded = input.required<boolean>();
  toggled = output();

  focus() {
    this.element.focus();
  }
}
