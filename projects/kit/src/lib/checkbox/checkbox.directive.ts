import { Directive, input, output } from '@angular/core';
import { isSpaceKey } from '../keyboard/key-checkers';

@Directive({
  selector: '[ktA11yCheckbox]',
  host: {
    role: 'checkbox',
    tabindex: '0',
    '(click)': 'onClick($event)',
    '(keydown)': 'onKeydown($event)',
    '[attr.aria-checked]': 'a11yIsChecked()',
    '[attr.aria-disabled]': 'a11yIsDisabled()',
  },
})
export class A11yCheckboxDirective {
  pressed = output<Event>();
  a11yIsChecked = input.required<boolean | undefined | null>();
  a11yIsDisabled = input<boolean>();

  onClick($event: Event) {
    if (this.a11yIsDisabled()) {
      return;
    }
    this.pressed.emit($event);
  }

  onKeydown($event: KeyboardEvent) {
    if (this.a11yIsDisabled()) {
      return;
    }
    if (isSpaceKey($event)) {
      $event.preventDefault();
      this.pressed.emit($event);
    }
  }
}
