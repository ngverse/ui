import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
  selector: 'table[appTable]',
})
export class TableDirective {
  selectable = input(false, { transform: booleanAttribute });
}
