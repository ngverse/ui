import { Highlightable } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  inject,
  input,
  linkedSignal,
  OnDestroy,
  output,
} from '@angular/core';
import { A11ySelectStack } from './select-stack';

@Directive({
  selector: '[ktA11yOption]',
  host: {
    role: 'option',
    '[attr.aria-selected]': 'a11yIsSelected()',
    '[attr.aria-disabled]': 'a11yIsDisabled()',
    '(keydown)': 'onKeydown($event)',
    '[tabindex]': 'isActive()? 0 : -1',
    '(focus)': 'onFocus()',
    '(click)': 'pressed.emit()',
  },
})
export class A11yOptionDirective implements OnDestroy, Highlightable {
  pressed = output<Event>();
  a11yIsSelected = input.required<boolean>();
  a11yIsDisabled = input<boolean, boolean | undefined>(false, {
    transform: (value: boolean | undefined) => {
      this.disabled = value;
      return !!value;
    },
  });
  private stack = inject(A11ySelectStack);
  isActive = linkedSignal(() => this.a11yIsSelected());
  element = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>)
    .nativeElement;
  constructor() {
    this.stack.add(this);
  }

  getLabel(): string {
    return this.element.textContent || '';
  }

  disabled?: boolean | undefined;

  onFocus() {
    this.stack.setActiveItem(this);
  }
  setActiveStyles(): void {
    this.element.focus();
    this.isActive.set(true);
  }
  setInactiveStyles(): void {
    this.isActive.set(false);
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.pressed.emit(event);
    }
    this.stack.onKeydown(event);
  }

  ngOnDestroy(): void {
    this.stack.remove(this);
  }
}
