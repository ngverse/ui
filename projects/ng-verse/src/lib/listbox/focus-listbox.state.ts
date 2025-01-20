import { Injectable, signal } from '@angular/core';
import { FocusListboxItemDirective } from './focus-listbox-item.directive';

@Injectable()
export class FocusListboxState {
  private _items = signal<FocusListboxItemDirective[]>([]);
  horizontal = signal(true);

  items = this._items;

  add(item: FocusListboxItemDirective) {
    const items = [...this._items()];
    items.push(item);
    this._items.set(items);
  }

  remove(item: FocusListboxItemDirective) {
    const items = this._items();
    this._items.set(items.filter((i) => i !== item));
  }

  onKeydown($event: KeyboardEvent, item: FocusListboxItemDirective) {
    const key = $event.key;
    if (this.horizontal()) {
      switch (key) {
        case 'ArrowRight':
          this.focusNext(item);
          break;
        case 'ArrowLeft':
          this.focusPrevious(item);
      }
    } else {
      switch (key) {
        case 'ArrowDown':
          this.focusNext(item);
          break;
        case 'ArrowUp':
          this.focusPrevious(item);
      }
    }
  }

  focusPrevious(current: FocusListboxItemDirective) {
    const items = this._items();
    const index = items.indexOf(current);
    const previous = items[(index - 1 + items.length) % items.length];
    previous.focus();
  }

  focusNext(current: FocusListboxItemDirective) {
    const items = this._items();
    const index = items.indexOf(current);
    const next = items[(index + 1) % items.length];
    next.focus();
  }
}
