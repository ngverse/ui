import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import {
  matArrowDownward,
  matArrowUpward,
} from '@ng-icons/material-icons/baseline';

import { SortDirective } from './sort.directive';
import { SORT_DIRECTION } from './table.types';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'th[appSortHeader]',
  imports: [NgIcon],
  template: `<div class="flex items-center gap-1">
    <ng-content></ng-content>
    @if (isAsc()) {
      <ng-icon [svg]="ARROW_DOWN" size="16"></ng-icon>
    }
    @if (isDesc()) {
      <ng-icon [svg]="ARROW_UP" size="16"></ng-icon>
    }
  </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'onClick()',
    class: 'cursor-pointer',
  },
})
export class SortHeaderComponent {
  private _sort = inject(SortDirective);
  direction = signal<SORT_DIRECTION | undefined>(undefined);
  ARROW_DOWN = matArrowDownward;
  ARROW_UP = matArrowUpward;
  isAsc = computed(() => this.direction() === 'asc');
  isDesc = computed(() => this.direction() === 'desc');
  field = input<string | undefined>(undefined, { alias: 'appSortHeader' });
  private element = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>)
    .nativeElement;

  get fieldKey() {
    return this.field()
      ? this.field()
      : this.element.textContent?.toLowerCase();
  }

  onClick() {
    const nextSort = this.nextSortType();
    const fieldKey = this.fieldKey;
    this.direction.set(nextSort);
    if (fieldKey && nextSort) {
      this._sort.sort({
        name: fieldKey,
        direction: nextSort,
      });
    }
  }

  private nextSortType() {
    const direction = this.direction();
    if (!direction || direction === 'desc') {
      return 'asc';
    }
    return 'desc';
  }
}
