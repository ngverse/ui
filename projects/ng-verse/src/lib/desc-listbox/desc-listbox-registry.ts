import { Injectable, signal } from '@angular/core';
import { DescListboxItemDirective } from './desc-listbox-item.directive';

@Injectable()
export class DescListboxRegistry {
  items = signal<readonly DescListboxItemDirective[]>([]);

  add(item: DescListboxItemDirective) {
    this.items.set([...this.items(), item]);
  }
  remove(item: DescListboxItemDirective) {
    this.items.set(this.items().filter((i) => i !== item));
  }
}
