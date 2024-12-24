import { computed, Injectable } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MultiSelectItemComponent } from './multi-select-item/multi-select-item.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type CompareWith = (o1: unknown, o2: unknown) => boolean;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OnChangeFunction = ((_: any) => void) | undefined;

export type OnTouchedFunction = (() => void) | undefined;

@Injectable()
export class MultiSelectState {

  _onChange: OnChangeFunction;
  _onTouched: OnTouchedFunction;

  private readonly selectionModel = new SelectionModel<unknown>(true);
  private readonly componentsMap = new Map<unknown, MultiSelectItemComponent>();

  constructor() {
    this.selectionModel.changed.pipe(takeUntilDestroyed()).subscribe((change) => {
      change.removed.forEach((option) => {
        this.componentsMap.get(option)?.selected.set(false);
      });

      change.added.forEach((option) => {
        this.componentsMap.get(option)?.selected.set(true);
      });
    })
  }

  hasSelectedValues() {
    return this.selectionModel.hasValue()
  }

  toggle(comp: MultiSelectItemComponent) {
    this.selectionModel.toggle(comp.value());
    this._onChange?.(this.selectionModel.selected);
    this._onTouched?.()
  }

  add(comp: MultiSelectItemComponent) {
    this.componentsMap.set(comp.value(), comp);

    if (this.selectionModel.isSelected(comp.value())) {
      comp.selected.set(true);
    }
  }

  remove(comp: MultiSelectItemComponent) {
    this.componentsMap.delete(comp.value());

    if (this.selectionModel.isSelected(comp.value())) {
      this.selectionModel.deselect(comp.value());
      this._onChange?.(this.selectionModel.selected);
      this._onTouched?.();
    }
  }

  get changed() {
    return this.selectionModel.changed;
  }

  setSelection(...values: unknown[]) {
    this.selectionModel.setSelection(...values);
  }

  clear() {
    this.selectionModel.clear();
  }
}
