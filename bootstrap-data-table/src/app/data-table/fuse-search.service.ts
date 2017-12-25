import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import * as Fuse from 'fuse.js';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FuseSearchService {

  defaults: NgFuseOptions = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    minSearchStringLenght: 1
  };

  searchOptions: NgFuseOptions = this.defaults;

  search(collection: Array<Object>, searchString: string, options: NgFuseOptions = {}) {
    Object.assign(this.searchOptions, this.defaults, options);

    let results = [];
    if (searchString && searchString.length >= this.searchOptions.minSearchStringLenght) {
      const fuse = new Fuse(collection, this.searchOptions);
      results = fuse.search(searchString);
      return results;
    } else {
      return collection;
    }
  }

  searchObservable(collection: Observable<Object>, searchString: string, options: NgFuseOptions = {}): Observable<Object> {
   return collection.toArray()
      .switchMap(items => {
        const mItems = items[0];
        const mItemsArr = <Array<Object>>mItems;
        const results = this.search(mItemsArr, searchString, options);
        return results;
      })
     /* .subscribe(items => {
          console.log("results");
          console.log(items);
      })*/;

    // return collection;
  }

}

export interface NgFuseOptions extends Fuse.FuseOptions {
  minSearchStringLenght?: 1;
}
