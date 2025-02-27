import { Directive } from '@angular/core';
import { parentOrNewInstance } from '../utils/resolve-registry';
import { A11yTabStack } from './tab-stack';

@Directive({
  selector: '[ktA11yTabGroup]',
  providers: [
    {
      provide: A11yTabStack,
      useFactory: () => parentOrNewInstance(A11yTabStack),
    },
  ],
})
export class A11yTabGroupDirective {}
