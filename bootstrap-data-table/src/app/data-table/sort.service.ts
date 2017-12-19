import { ColumnSortEvent } from './column-sort-event';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SortService {

  constructor() { }
  sort(items: Array<any>, key: string, direction = 'asc'): Array<any> {
    return items.sort((item1, item2) => {
      return this.compare(item1, item2, key, direction);
    });
  }


  private compare(item1: any, item2: any, key: string, order: string): number {
    if (!item1.hasOwnProperty(key) || !item2.hasOwnProperty(key)) {
      return 0;
    }

    const varA = (typeof item1[key] === 'string') ? item1[key].toUpperCase() : item1[key];
    const varB = (typeof item2[key] === 'string') ? item2[key].toUpperCase() : item2[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (order === 'desc') ? (comparison * -1) : comparison;
  }

}
