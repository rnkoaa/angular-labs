import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PageNumber } from "../pagination/page-number";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html'
})
export class PagerComponent implements OnInit, OnChanges {
  totalPages: number;
  currentPage: number = 0;

  @Input() offset: number = 0;
  @Input() limit: number = 1;
  @Input() size: number = 1;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  pages: PageNumber[];

  constructor() { }

  ngOnChanges(): void {
    this.pages = this.getPages(this.offset, this.limit, this.size, 2);
  }
  ngOnInit() {
    this.pages = this.getPages(this.offset, this.limit, this.size, 2);
  }

  selectPage(page: number, event) {
    this.cancelEvent(event);
    if (this.isValidPageNumber(page, this.totalPages)) {
      this.pageChange.emit((page - 1) * this.limit);
    }
  }

  gotoFirst(page: number, event) {
    this.cancelEvent(event);
    if (this.isValidPageNumber(page, this.totalPages) && this.currentPage != 1) {
      this.pageChange.emit((page - 1) * this.limit);
    }
  }


  gotoLast(page: number, event) {
    this.cancelEvent(event);
    if (this.isValidPageNumber(page, this.totalPages) && this.currentPage != this.totalPages) {
      this.pageChange.emit((page - 1) * this.limit);
    }
  }

  cancelEvent(event) {
    event.preventDefault();
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

  getPages(offset: number, limit: number, size: number, adjacentCount): Array<PageNumber> {
    this.currentPage = this.getCurrentPage(offset, limit);
    this.totalPages = this.getTotalPages(limit, size);

    let mPages: Array<PageNumber> = [];
    let firstPage = 1;
    let lastPage = this.totalPages;
    if (lastPage === 1) {
      return;
    }

    let firstAdjacentPage, lastAdjacentPage;
    if (this.currentPage <= adjacentCount * 2) {
      firstAdjacentPage = firstPage;
      lastAdjacentPage = Math.min(firstPage + (2 * adjacentCount), lastPage);
    } else if (this.currentPage > lastPage - (2 * adjacentCount)) {
      lastAdjacentPage = lastPage;
      firstAdjacentPage = lastPage - (2 * adjacentCount);
    } else {
      firstAdjacentPage = this.currentPage - adjacentCount;
      lastAdjacentPage = this.currentPage + adjacentCount;
    }

    // Previous Link
    if (this.currentPage === firstPage) {
      mPages.push(new PageNumber(0, '<', true, false, false, true));
    } else {
      mPages.push(new PageNumber(this.currentPage - 1, `${this.currentPage - 1}`, true, false, false, true));
    }

    // firstPage
    if (firstAdjacentPage > firstPage) {
      mPages.push(new PageNumber(firstPage, `${firstPage}`, false, false, false, true));
      if (firstAdjacentPage > firstPage + 1) {
        mPages.push(new PageNumber(0, '...', false, false, false, false));
      }
    }

    let idx = 0;
    for (idx = firstAdjacentPage; idx <= lastAdjacentPage; idx++) {
      if (this.currentPage === idx) {
        mPages.push(new PageNumber(idx, `${idx}`, false, true, false, true)); // indicate that it is current
      } else {
        mPages.push(new PageNumber(idx, `${idx}`, false, false, false, true));
      }
    }

    if (lastAdjacentPage < lastPage) {
      if (lastAdjacentPage < lastPage - 1) {
        mPages.push(new PageNumber(0, "...", false, false, false, false));
      }
      mPages.push(new PageNumber(lastPage, `${lastPage}`, false, false, false, true));
    }

    // Next Link
    if (this.currentPage == lastPage) {
      mPages.push(new PageNumber(0, ">", false, false, true, false));
    } else {
      mPages.push(new PageNumber(this.currentPage + 1, `${this.currentPage + 1}`, false, false, true, true)); //add isNext
    }

    return mPages;
  }
}
