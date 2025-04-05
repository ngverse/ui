import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
  selector: '[appTrHead]',
  host: {
    class: 'text-xs text-left text-on-surface uppercase bg-surface',
    '[class.sticky]': 'sticky()',
    '[class.top-0]': 'sticky()',
    '[class.z-1]': 'sticky()',
  },
})
export class TrHeadDirective {
  sticky = input(false, { transform: booleanAttribute });
}
