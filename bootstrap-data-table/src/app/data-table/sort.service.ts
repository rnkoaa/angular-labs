import { ColumnSortEvent } from './column-sort-event';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SortService {

  constructor() { }

  private columnSortedSource = new Subject<ColumnSortEvent>();

  columnSorted$ = this.columnSortedSource.asObservable();

  columnSorted(event: ColumnSortEvent) {
      this.columnSortedSource.next(event);
  }

}
