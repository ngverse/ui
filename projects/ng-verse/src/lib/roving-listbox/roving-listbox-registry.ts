import { Injectable, signal } from '@angular/core';
import { RovingListboxItemDirective } from './roving-listbox-item.directive';

@Injectable()
export class RovingListboxRegistry {
  items = signal<readonly RovingListboxItemDirective[]>([]);

  add(item: RovingListboxItemDirective) {
    this.items.set([...this.items(), item]);
  }
  remove(item: RovingListboxItemDirective) {
    this.items.set(this.items().filter((i) => i !== item));
  }
}
