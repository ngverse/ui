import { Injectable, signal } from '@angular/core';
import { ListboxItemDirective } from './listbox-item.directive';

@Injectable()
export class ListboxRegistry<T> {
  items = signal<readonly ListboxItemDirective<T>[]>([]);

  add(item: ListboxItemDirective<T>) {
    this.items.set([...this.items(), item]);
  }
  remove(item: ListboxItemDirective<T>) {
    this.items.set(this.items().filter((i) => i !== item));
  }
}
