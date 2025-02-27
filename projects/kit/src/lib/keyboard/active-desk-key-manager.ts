import { OutputEmitterRef, Signal, signal } from '@angular/core';
import { BaseRegistry } from '../utils/base-registry';
import {
  isDownArrow,
  isEndKey,
  isEnter,
  isHomeKey,
  isLeftArrow,
  isRightArrow,
  isUpArrow,
} from './key-checkers';

export interface GnActiveDescOption {
  activate(): void;

  deactivate(): void;

  isSelected: Signal<boolean>;

  selected: OutputEmitterRef<GnActiveDescOption>;
}

export class GnActiveDescKeyManager<
  T extends GnActiveDescOption,
> extends BaseRegistry<T> {
  private _activeItem = signal<T | null>(null);
  constructor(
    public withWrap = false,
    public horizontal = false
  ) {
    super();
  }

  private setActiveItem(item: T) {
    const currActive = this._activeItem();
    if (currActive) {
      currActive.deactivate();
    }
    this._activeItem.set(item);
    item.activate();
  }

  moveToPrev(current: T): void {
    const items = this.items();
    const currentIndex = items.findIndex((i) => i === current);
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      const prev = items[prevIndex];
      this.setActiveItem(prev);
    } else if (this.withWrap) {
      this.moveToLast();
    }
  }
  moveToNext(current: T): void {
    const items = this.items();
    const currentIndex = items.findIndex((i) => i === current);
    const nextIndex = currentIndex + 1;

    if (nextIndex < items.length) {
      const next = items[nextIndex];
      this.setActiveItem(next);
    } else if (this.withWrap) {
      this.moveToFirst();
    }
  }
  moveToFirst() {
    const items = this.items();
    if (items.length > 0) {
      const first = items[0];
      this.setActiveItem(first);
    }
  }
  moveToLast() {
    const items = this.items();
    if (items.length > 0) {
      const last = items[items.length - 1];
      this.setActiveItem(last);
    }
  }

  onKeydown(event: KeyboardEvent) {
    const current = this._activeItem();

    if (isEnter(event)) {
      if (current) {
        current.selected.emit(current);
      }
      event.preventDefault();
      return;
    }

    if (isHomeKey(event)) {
      this.moveToFirst();
      event.preventDefault();
      return;
    }
    if (isEndKey(event)) {
      this.moveToLast();
      event.preventDefault();
      return;
    }

    const prevArrow = this.horizontal ? isLeftArrow(event) : isUpArrow(event);

    if (prevArrow) {
      if (!current) {
        this.moveToFirst();
        return;
      }
      this.moveToPrev(current);
      event.preventDefault();
      return;
    }

    const nextArrow = this.horizontal
      ? isRightArrow(event)
      : isDownArrow(event);
    if (nextArrow) {
      if (!current) {
        this.moveToFirst();
        return;
      }
      this.moveToNext(current);
      event.preventDefault();
      return;
    }
  }

  activateFirstOrSelected() {
    const items = this.items();
    const selected = items.find((i) => i.isSelected());
    if (selected) {
      this.setActiveItem(selected);
    } else {
      this.moveToFirst();
    }
  }
}
