import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  LucideAngularModule,
} from 'lucide-angular';
import { SortDirective } from './sort.directive';
import { SORT_DIRECTION } from './table.types';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'th[appSortHeader]',
  imports: [LucideAngularModule],
  template: `<div class="flex items-center gap-1">
    <ng-content></ng-content>
    @if (isAsc()) {
      <lucide-angular [size]="16" [img]="ArrowUpNarrowWide"></lucide-angular>
    }
    @if (isDesc()) {
      <lucide-angular [size]="16" [img]="ArrowDownNarrowWide"></lucide-angular>
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
  ArrowUpNarrowWide = ArrowUpNarrowWide;
  ArrowDownNarrowWide = ArrowDownNarrowWide;
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
