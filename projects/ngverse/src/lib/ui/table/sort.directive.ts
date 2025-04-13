import { Directive, output } from '@angular/core';
import { SortChangeType } from './table.types';

@Directive({
  selector: 'table[appSort]',
})
export class SortDirective {
  sortChange = output<SortChangeType>();

  sort(change: SortChangeType) {
    this.sortChange.emit(change);
  }
}
