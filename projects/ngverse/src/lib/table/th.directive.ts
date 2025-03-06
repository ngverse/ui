import { Directive } from '@angular/core';

@Directive({
  selector: 'th[appTh]',
  host: {
    class: 'px-6 py-3',
  },
})
export class ThDirective {}
