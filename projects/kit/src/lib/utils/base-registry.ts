import { signal } from '@angular/core';

export class BaseRegistry<T> {
  protected _items = signal<readonly T[]>([]);

  items = this._items.asReadonly();

  add(item: T) {
    this._items.update((items) => [...items, item]);
  }
  remove(item: T) {
    this._items.update((items) => items.filter((i) => i !== item));
  }
}
