import { Directive, inject } from '@angular/core';
import { A11ySelectStack } from './select-stack';

@Directive({
  selector: '[ktA11ySelect]',
})
export class A11ySelectDirective {
  private _stack = inject(A11ySelectStack);
  focus() {
    setTimeout(() => {
      this._stack.focus();
    });
  }
}
