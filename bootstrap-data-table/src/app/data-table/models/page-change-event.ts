export interface PageChangeEvent {
  page?: number;
  sortDirection?: string;
  sortable: boolean;
  size?: number;
  sortBy?: string;
  eventType: PageChangeType;
}

export enum PageChangeType {
  PAGE_CHANGE = 0,
  SORT,
  PAGE_SIZE,
  NO_PAGINATION,
  COLUMN_ADDED,
  COLUMN_REMOVED,
  TABLE_RELOAD,
  COLUMN_SORTED
}
