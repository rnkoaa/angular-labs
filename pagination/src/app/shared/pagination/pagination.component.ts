import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PageNumber } from './page-number';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() offset = 0;
  @Input() limit = 1;
  @Input() size = 1;
  @Input() range = 3;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pages: Observable<PageNumber[]>;
  currentPage: number;
  totalPages: number;

  constructor() { }
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
