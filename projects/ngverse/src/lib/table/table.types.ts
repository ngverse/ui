export type SORT_DIRECTION = 'asc' | 'desc' | 'none';

export interface SortChangeType {
  name: string;
  direction: SORT_DIRECTION;
}
