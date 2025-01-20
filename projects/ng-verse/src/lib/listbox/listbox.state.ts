import { Injectable, signal } from '@angular/core';
import { ListboxItemDirective } from './listbox-item.directive';

@Injectable()
export class ListboxState {
  private _items = signal<ListboxItemDirective[]>([]);

  items = this._items;

  horizontal = signal(false);

  activeItem = signal<ListboxItemDirective | undefined>(undefined);

  add(item: ListboxItemDirective) {
    const items = [...this._items()];
    items.push(item);
    this._items.set(items);
  }

  isActive(item: ListboxItemDirective) {
    return this.activeItem() === item;
  }

  remove(item: ListboxItemDirective) {
    const items = this._items();
    this._items.set(items.filter((i) => i !== item));
  }

  onKeydown($event: KeyboardEvent) {
    const key = $event.key;

    if (key === 'Enter') {
      this.activeItem()?.activated.emit();
      $event.preventDefault();
    }

    if (this.horizontal()) {
      switch (key) {
        case 'ArrowRight':
          this.activateNext(this.activeItem());
          $event.preventDefault();
          break;
        case 'ArrowLeft':
          this.activePrevious(this.activeItem());
          $event.preventDefault();

          break;
      }
    } else {
      switch (key) {
        case 'ArrowDown':
          this.activateNext(this.activeItem());
          $event.preventDefault();

          break;
        case 'ArrowUp':
          this.activePrevious(this.activeItem());
          $event.preventDefault();
          break;
      }
    }
  }

  activateFirst() {
    const items = this._items();
    this.activeItem.set(items[0]);
    this.activeItem()?.scrollIntoView();
  }

  activateByIndex(index: number) {
    const items = this._items();
    this.activeItem.set(items[index]);
    this.activeItem()?.scrollIntoView();
  }

  activateNext(current: ListboxItemDirective | undefined) {
    const items = this._items();
    const index = current === undefined ? -1 : items.indexOf(current);
    const previous = items[(index + 1 + items.length) % items.length];
    this.activeItem.set(previous);
    this.activeItem()?.scrollIntoView();
  }

  activePrevious(current: ListboxItemDirective | undefined) {
    const items = this._items();
    const index = current === undefined ? -1 : items.indexOf(current);
    const next = items[(index - 1) % items.length];
    this.activeItem.set(next);
    this.activeItem()?.scrollIntoView();
  }
}
