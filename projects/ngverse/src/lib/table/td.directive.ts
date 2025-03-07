import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
  selector: 'td[appTd]',
  host: {
    class: 'px-6 py-3',
    '[class.sticky]': 'sticky()',
    '[class.left-0]': 'sticky()',
  },
})
export class TdDirective {
  sticky = input(false, { transform: booleanAttribute });
}
