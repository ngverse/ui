export type SORT_DIRECTION = 'asc' | 'desc';

export interface SortChangeType {
  name: string;
  direction: SORT_DIRECTION;
}
