import { Directive } from '@angular/core';

@Directive({
  selector: '[ktA11yAlert]',
  host: { role: 'alert' },
})
export class A11yAlertDirective {}
