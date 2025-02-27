import { ActiveDescendantKeyManager, Highlightable } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { inject, Injector, signal } from '@angular/core';

export class BaseStack<T extends Highlightable> {
  private _dir = inject(Directionality);
  protected _items = signal<readonly T[]>([]);
  private _listKeyManager = new ActiveDescendantKeyManager(
    this._items,
    inject(Injector)
  );

  items = this._items.asReadonly();

  add(item: T) {
    this._items.update((items) => [...items, item]);
  }
  remove(item: T) {
    this._items.update((items) => items.filter((i) => i !== item));
  }

  onKeyDown(event: KeyboardEvent) {
    this._listKeyManager.onKeydown(event);
  }

  toHorizontal() {
    this._listKeyManager = this._listKeyManager.withHorizontalOrientation(
      this._dir.value
    );
  }

  toVertical() {
    this._listKeyManager = this._listKeyManager.withVerticalOrientation();
  }

  withWrap() {
    this._listKeyManager = this._listKeyManager.withWrap(true);
  }

  setActiveItem(item: T) {
    this._listKeyManager.setActiveItem(item);
  }
}
