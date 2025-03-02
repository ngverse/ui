import { Directive, input } from '@angular/core';

@Directive({
  selector: '[ktA11yProgressbar]',
  host: {
    role: 'progressbar',
    '[attr.aria-valuenow]': 'a11yValueNow()',
    '[attr.aria-valuemin]': 'a11yValueMin()',
    '[attr.aria-valuemax]': 'a11yValueMax()',
  },
})
export class A11yProgressbarDirective {
  a11yValueMin = input<number>();
  a11yValueMax = input<number>();
  a11yValueNow = input<number>();
}
