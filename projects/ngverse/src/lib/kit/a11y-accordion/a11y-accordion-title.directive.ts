import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
} from '@angular/core';
import { A11yAccordionDirective } from './a11y-accordion.directive';
import { A1yyAccordionStack } from './a11y-accordion.stack';

@Directive({
  selector: '[appA11yAccordionTitle]',
  host: {
    '(keydown)': 'onKeydown($event)',
    '(click)': 'toggled.emit()',
    '[attr.aria-controls]': 'panelId',
    '[attr.aria-expanded]': 'isExpanded()',
    class: 'gn-accordion-title',
    '[id]': 'id',
  },
})
export class A11yAccordionTitleDirective implements OnDestroy {
  private stack = inject(A1yyAccordionStack);
  private element = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>)
    .nativeElement;
  private accordion = inject(A11yAccordionDirective);

  panelId = this.accordion.panelId;
  id = this.accordion.titleId;

  isExpanded = input.required<boolean>();
  toggled = output();

  onKeydown(event: KeyboardEvent) {
    this.stack.onKeydown(event);
  }

  constructor() {
    this.stack.add(this);
  }

  focus() {
    this.element.focus();
  }

  ngOnDestroy(): void {
    this.stack.remove(this);
  }
}
