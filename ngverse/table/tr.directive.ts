import { computed, Directive, inject, input } from '@angular/core';
import { TableDirective } from './table.directive';

@Directive({
  selector: '[appTr]',
  host: {
    class: 'border-b border-border',
    '[class]': 'highlight()',
  },
})
export class TrDirective {
  table = inject(TableDirective);
  isSelected = input<boolean>();

  highlight = computed(() => {
    let classes = '';
    if (this.table.selectable()) {
      classes += 'hover:bg-accent hover:text-accent-foreground cursor-pointer';
    }
    if (this.isSelected()) {
      classes += ' bg-accent text-accent-foreground';
    } else {
      classes += ' bg-background';
    }
    return classes;
  });
}
