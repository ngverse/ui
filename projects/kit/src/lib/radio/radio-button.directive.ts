import {
  Directive,
  ElementRef,
  inject,
  input,
  linkedSignal,
  OnDestroy,
  output,
} from '@angular/core';
import { SelectableOption } from '../utils/selectable-stack';
import { A11yRadioStack } from './radio-stack';

@Directive({
  selector: '[ktA11yRadioButton]',
  host: {
    role: 'radio',
    '[attr.aria-checked]': 'a11yIsChecked()',
    '(keydown)': 'onKeydown($event)',
    '[tabindex]': 'isActive()? 0 : -1',
    '(focus)': 'onFocus()',
    '[attr.aria-disabled]': 'a11yIsDisabled()',
  },
})
export class A11yRadioButtonDirective implements SelectableOption, OnDestroy {
  a11yIsChecked = input.required<boolean>();
  a11yIsSelected = this.a11yIsChecked;
  a11yIsDisabled = input<boolean>();
  isActive = linkedSignal(() => this.a11yIsSelected());

  get disabled() {
    return this.a11yIsDisabled();
  }

  pressed = output();
  stack = inject(A11yRadioStack);
  element = inject(ElementRef).nativeElement;

  constructor() {
    this.stack.add(this);
  }

  onFocus() {
    this.stack.setActiveItem(this);
  }

  setActiveStyles(): void {
    this.element.focus();
    if (this.a11yIsDisabled()) {
      return;
    }
    this.pressed.emit();
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setInactiveStyles(): void {}

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.pressed.emit();
    }
    this.stack.onKeydown(event);
  }

  ngOnDestroy(): void {
    this.stack.remove(this);
  }
}
