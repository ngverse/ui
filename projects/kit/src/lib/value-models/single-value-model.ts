import { computed, signal } from '@angular/core';
import { ValueModelCompareWith } from './value-model.types';

export class SingleValueModel<T> {
  private _value = signal<T | undefined>(undefined);
  private readonly compareWith = signal<ValueModelCompareWith>(
    (o1: unknown, o2: unknown) => o1 === o2
  );

  value = computed(() => {
    return this._value();
  });

  setValue(value: T) {
    this._value.set(value);
  }

  clear() {
    this._value.set(undefined);
  }

  setCompareWith(compareWith: ValueModelCompareWith) {
    this.compareWith.set(compareWith);
  }

  isSelected(value: T) {
    return this.compareWith()(this._value(), value);
  }
}
