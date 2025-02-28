import { Directive } from '@angular/core';
import { parentOrNewInstance } from '../utils/resolve-registry';
import { A11yRadioStack } from './radio-stack';

@Directive({
  selector: '[ktA11yRadioGroup]',
  host: {
    role: 'radiogroup',
  },
  providers: [
    {
      provide: A11yRadioStack,
      useFactory: () => parentOrNewInstance(A11yRadioStack),
    },
  ],
})
export class A11yRadioGroupDirective {}
