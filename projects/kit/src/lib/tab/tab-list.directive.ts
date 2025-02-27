import { Directive } from '@angular/core';

@Directive({
  selector: '[ktA11yTabList]',
  host: {
    role: 'tablist',
  },
})
export class A11yTabListDirective {}
