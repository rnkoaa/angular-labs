import { SortService } from './sort.service';
import { Directive, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[appSortableTable]'
})
export class SortableTableDirective implements OnInit, OnDestroy {

  constructor(private sortService: SortService) { }

  @Output()
  sorted = new EventEmitter();

  private columnSortedSubscription: Subscription;

  ngOnInit() {
    this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
      console.log(`Got Sorting Event: ${JSON.stringify(event)}`);
      this.sorted.emit(event);
    });
  }

  ngOnDestroy() {
    this.columnSortedSubscription.unsubscribe();
  }

}
