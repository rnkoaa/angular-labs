import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataTableSearchService {
  constructor() { }

  searchTerm$;
  private searchTermSource = new Subject<string>();

  // private itemCountUpdatedSource = new Subject<number>();

  // itemCountUpdated$ = this.itemCountUpdatedSource.asObservable();

  // itemCountUpdated(event: number) {
  //   this.itemCountUpdatedSource.next(event);
  // }
}
