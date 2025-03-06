import { computed, signal } from '@angular/core';
import { SORT_DIRECTION, SortChangeType } from './table.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sortByKey<T>(array: T[], key: string, order: SORT_DIRECTION) {
  return [...array].sort((a, b) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const aValue = (a as any)[key];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bValue = (b as any)[key];
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

export class TableLocalSource<T> {
  private _data = signal<T[]>([]);
  private _limit = signal(10);
  private _currentPage = signal(0);
  private _sort = signal<SortChangeType | undefined>(undefined);
  private _sortFn = signal(sortByKey);

  currentPage = this._currentPage.asReadonly();
  totalPages = computed(() => Math.ceil(this._data().length / this._limit()));
  data = computed(() => {
    let data = this._data();
    const sort = this._sort();

    if (sort) {
      data = this._sortFn()(data, sort.name, sort.direction);
    }

    const start = this._currentPage() * this._limit();
    const end = start + this._limit() - 1;
    return data.slice(start, end);
  });

  get limit() {
    return this._limit.asReadonly();
  }

  constructor(options?: { limit?: number; data?: T[] }) {
    this._limit.set(options?.limit || 10);
    this._data.set(options?.data || []);
  }

  setData(data: T[]) {
    this._data.set(data);
  }

  setPage(page: number) {
    this._currentPage.set(page);
  }

  sort(sort: SortChangeType) {
    this._currentPage.set(0);
    this._sort.set(sort);
  }
}
