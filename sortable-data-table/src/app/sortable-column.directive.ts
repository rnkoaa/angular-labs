import { Directive, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { SortService } from './sort.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[appSortableColumn]'
})
export class SortableColumnDirective implements OnInit, OnDestroy {

  @Input() columnName: string;
  @Input() sortDirection: string;

  private columnSortedSubscription: Subscription;

  constructor(private sortService: SortService) { }

  @HostListener('click')
  sort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    console.log(`Got a Clicked event to sort ${this.columnName} & direction ${this.sortDirection}`);
    this.sortService.columnSorted({ sortColumn: this.columnName, sortDirection: this.sortDirection });
  }

  ngOnInit(): void {
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
