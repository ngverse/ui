import { Directive, inject } from '@angular/core';
import { parentOrNewInstance } from '../utils/resolve-registry';
import { A11ySelectStack } from './select-stack';

@Directive({
  selector: '[ktA11ySelect]',
  providers: [
    {
      provide: A11ySelectStack,
      useFactory: () => parentOrNewInstance(A11ySelectStack),
    },
  ],
})
export class A11ySelectDirective {
  private _stack = inject(A11ySelectStack);
  focus() {
    setTimeout(() => {
      this._stack.focus();
    });
  }
}
