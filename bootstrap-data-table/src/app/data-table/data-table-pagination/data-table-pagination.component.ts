import { DataTableComponent } from '../data-table/data-table.component';
import { Component, EventEmitter, forwardRef, Inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PageNumber } from './page-number';

import 'rxjs/add/observable/range';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toArray';

@Component({
  selector: 'app-data-table-pagination',
  templateUrl: './data-table-pagination.component.html',
  styleUrls: ['./data-table-pagination.component.css']
})
export class DataTablePaginationComponent implements OnInit, OnChanges {
  @Input() offset = 0;
  @Input() limit = 1;
  @Input() size = 1;
  @Input() range = 3;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pages: Observable<PageNumber[]>;
  currentPage: number;
  totalPages: number;

  // constructor( @Inject(forwardRef(() => DataTableComponent)) public dataTable: DataTableComponent) { }

  // pageBack() {
  //   this.dataTable.offset -= Math.min(this.dataTable.limit, this.dataTable.offset);
  // }

  // pageForward() {
  //   this.dataTable.offset += this.dataTable.limit;
  // }

  // pageFirst() {
  //   this.dataTable.offset = 0;
  // }

  // pageLast() {
  //   this.dataTable.offset = (this.maxPage - 1) * this.dataTable.limit;
  // }

  // get maxPage() {
  //   return Math.ceil(this.dataTable.itemCount / this.dataTable.limit);
  // }

  // get limit() {
  //   return this.dataTable.limit;
  // }

  // set limit(value) {
  //   this.dataTable.limit = Number(<any>value); // TODO better way to handle that value of number <input> is string?
  // }

  // get page() {
  //   return this.dataTable.page;
  // }

  // set page(value) {
  //   this.dataTable.page = Number(<any>value);
  // }
  ngOnChanges(): void {
    this.getPages(this.offset, this.limit, this.size);
  }
  ngOnInit() {
    this.getPages(this.offset, this.limit, this.size);
  }

  selectPage(page: number, event) {
    this.cancelEvent(event);
    if (this.isValidPageNumber(page, this.totalPages)) {
      this.pageChange.emit((page - 1) * this.limit);
    }
  }

  cancelEvent(event) {
    event.preventDefault();
  }

  getPages(offset: number, limit: number, size: number) {
    this.currentPage = this.getCurrentPage(offset, limit);
    this.totalPages = this.getTotalPages(limit, size);

    this.pages = Observable.range(-this.range, this.range * 2 + 1)
      .map(pageOffset => this.currentPage + pageOffset)
      .filter(page => this.isValidPageNumber(page, this.totalPages))
      .map(page => new PageNumber(page, `${page}`, false, false, false, true))
      .toArray();
  }

  getCurrentPage(offset: number, limit: number): number {
    return Math.floor(offset / limit) + 1;
  }

  getTotalPages(limit: number, size: number): number {
    return Math.ceil(Math.max(size, 1) / Math.max(limit, 1));
  }

  isValidPageNumber(page: number, totalPages: number): boolean {
    return page > 0 && page <= totalPages;
  }

}
