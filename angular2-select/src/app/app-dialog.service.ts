import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppDialogService {
  private dialog$ = new BehaviorSubject<boolean>(false);

 dialogStatus$ = this.dialog$.asObservable();

  constructor() {}

  openDialog() {
    this.dialog$.next(true);
  }

  closeDialog(){
    this.dialog$.next(false);
  }

}
