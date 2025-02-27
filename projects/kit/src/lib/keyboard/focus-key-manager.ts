import { GnBaseRegistry } from '../utils/base-registry';
import {
  isDownArrow,
  isEndKey,
  isHomeKey,
  isLeftArrow,
  isRightArrow,
  isUpArrow,
} from './key-checkers';

export class GnFocusKeyManager<
  T extends { focus: () => void },
> extends GnBaseRegistry<T> {
  constructor(
    public withWrap = false,
    public horizontal = false
  ) {
    super();
  }

  moveToPrev(current: T): void {
    const items = this.items();
    const currentIndex = items.findIndex((i) => i === current);
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      const prev = items[prevIndex];
      prev.focus();
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
      next.focus();
    } else if (this.withWrap) {
      this.moveToFirst();
    }
  }
  moveToFirst() {
    const items = this.items();
    if (items.length > 0) {
      const first = items[0];
      first.focus();
    }
  }
  moveToLast() {
    const items = this.items();
    if (items.length > 0) {
      const last = items[items.length - 1];
      last.focus();
    }
  }

  onKeydown(event: KeyboardEvent, current: T) {
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
      this.moveToPrev(current);
      event.preventDefault();
      return;
    }

    const nextArrow = this.horizontal
      ? isRightArrow(event)
      : isDownArrow(event);
    if (nextArrow) {
      this.moveToNext(current);
      event.preventDefault();
      return;
    }
  }
}
