import { Directive, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { SortService } from './sort.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[appSortable]'
})
export class SortableDirective implements OnInit, OnDestroy {

  @Input() columnName: string;
  @Input() sortDirection: string;

  private columnSortedSubscription: Subscription;

  constructor(private sortService: SortService) { }

  @HostListener('click')
  sort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    console.log(`Got a Clicked event to sort ${this.columnName} & direction ${this.sortDirection}`);
    this.sortService.columnSorted({ column: this.columnName, direction: this.sortDirection });
  }

  ngOnInit(): void {
    // subscribe to sort changes so we can react when other columns are sorted
    this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
      // reset this column's sort direction to hide the sort icons
      if (this.columnName !== event.column) {
        this.sortDirection = '';
      }
    });
  }

  ngOnDestroy() {
    this.columnSortedSubscription.unsubscribe();
  }

}
