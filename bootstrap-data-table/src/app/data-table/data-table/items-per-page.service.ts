import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Injectable()
export class ItemsPerPageService {
  constructor() { }

  private itemCountUpdatedSource = new BehaviorSubject<number>(-1);

  itemCountUpdated$ = this.itemCountUpdatedSource.asObservable();

  itemCountUpdated(event: number) {
    this.itemCountUpdatedSource.next(event);
  }
}
