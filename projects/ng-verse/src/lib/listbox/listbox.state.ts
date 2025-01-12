import { Injectable, signal } from '@angular/core';
import { ListboxItemDirective } from './listbox-item.directive';

@Injectable()
export class ListboxState {
  private _items = signal<ListboxItemDirective[]>([]);

  items = this._items;

  add(item: ListboxItemDirective) {
    const items = [...this._items()];
    items.push(item);
    this._items.set(items);
  }

  remove(item: ListboxItemDirective) {
    const items = this._items();
    this._items.set(items.filter((i) => i !== item));
  }
}
