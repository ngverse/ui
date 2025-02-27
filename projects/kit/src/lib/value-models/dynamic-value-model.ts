import { computed, signal } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CompareWith = (o1: any, o2: any) => boolean;

export class DynamicValueModel<T> {
  public readonly isMultiple = signal<boolean>(false);
  private _value = signal<T[]>([]);
  private readonly compareWith = signal<CompareWith>(
    (o1: unknown, o2: unknown) => o1 === o2
  );

  value = computed(() => {
    if (this.isMultiple()) {
      return this._value();
    }
    return this._value()[0];
  });

  setValue(value: T | T[]) {
    if (this.isMultiple()) {
      if (!Array.isArray(value)) {
        throw new Error('for multiple selection value must be an array');
      } else {
        this._value.set(value);
      }
    }
    this._value.set([value as T]);
  }

  clear() {
    this._value.set([]);
  }

  setCompareWith(compareWith: CompareWith) {
    this.compareWith.set(compareWith);
  }

  setMultiple(isMultiple: boolean) {
    this.isMultiple.set(isMultiple);
  }

  toggleValue(value: T) {
    if (this.isMultiple()) {
      this._value.update((values) => {
        if (values.some((va) => this.compareWith()(va, value))) {
          return values.filter((va) => !this.compareWith()(va, value));
        } else {
          return [...values, value];
        }
      });
    } else {
      this.setValue(value);
    }
  }

  isSelected(value: T) {
    return this._value().some((va) => this.compareWith()(va, value));
  }
}
