import { Directive, input } from '@angular/core';

@Directive({
  selector: '[ktA11yOptionGroup]',
  host: {
    role: 'listbox',
    '[attr.aria-multiselectable]': 'mutliple()',
  },
})
export class A11yOptionGroupDirective {
  mutliple = input<boolean>();
}
