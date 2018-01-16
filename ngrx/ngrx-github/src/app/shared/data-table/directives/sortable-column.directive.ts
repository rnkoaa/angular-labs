import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appSortableColumn]'
})
export class SortableColumnDirective {

  // tslint:disable-next-line:no-input-rename
  @Input('appSortableColumn') columnName: string;

  constructor() { }

  @HostListener('click')
  sort() {
    // this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    // console.log(`column sort directive: ${this.columnName}`);
  }
}
