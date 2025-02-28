import { Directive } from '@angular/core';

@Directive({
  selector: '[ktA11yRadioGroup]',
  host: {
    role: 'radiogroup',
  },
})
export class A11yRadioGroupDirective {}
