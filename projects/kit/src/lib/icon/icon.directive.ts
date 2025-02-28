import { Directive } from '@angular/core';

@Directive({
  selector: '[ktA11yIcon]',
  host: {
    role: 'img',
    'aria-hidden': 'true',
  },
})
export class A11yIconDirective {}
