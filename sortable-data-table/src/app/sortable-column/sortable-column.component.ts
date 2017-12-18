import { SortService } from '../sort.service';
import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sortable-column',
  templateUrl: './sortable-column.component.html',
  styleUrls: ['./sortable-column.component.css']
})
export class SortableColumnComponent implements OnInit, OnDestroy {

  constructor(private sortService: SortService) { }

  // tslint:disable-next-line:no-input-rename
  @Input('sortable-column')
  columnName: string;

  // tslint:disable-next-line:no-input-rename
  @Input('sort-direction')
  sortDirection = '';

  private columnSortedSubscription: Subscription;

  @HostListener('click')
  sort() {
    console.log('Got a Clicked event');
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortService.columnSorted({ sortColumn: this.columnName, sortDirection: this.sortDirection });
  }

  ngOnInit() {
    // subscribe to sort changes so we can react when other columns are sorted
    this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
      // reset this column's sort direction to hide the sort icons
      if (this.columnName !== event.sortColumn) {
        this.sortDirection = '';
      }
    });
  }

  ngOnDestroy() {
    this.columnSortedSubscription.unsubscribe();
  }
}
