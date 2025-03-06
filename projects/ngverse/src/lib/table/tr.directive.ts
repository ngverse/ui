import { Directive } from '@angular/core';

@Directive({
  selector: '[appTr]',
  host: {
    class: 'bg-background border-b border-border',
  },
})
export class TrDirective {}
