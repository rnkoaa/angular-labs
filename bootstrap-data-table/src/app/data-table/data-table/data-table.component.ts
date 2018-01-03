import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DataTableColumnComponent } from './data-table-column.component';
import { FuseSearchService } from '../fuse-search.service';
import { SortService } from '../sort.service';
import { TableOptions } from '../table-options';
import { DataTableSearchService } from './data-table-search.service';
import { ItemPerPageComponent } from './item-per-page.component';
import { ItemsPerPageService } from './items-per-page.service';
import { PageChangeEvent, PageChangeType } from '../page-change-event';
import { DataTablePaginationComponent } from '../data-table-pagination/data-table-pagination.component';
import { ItemCheckedEvent } from './data-table-checked-event';
import { TableOptionsService } from './table-options.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit, OnDestroy {

  opts = {
    shouldSort: true,
    tokenize: true,
    matchAllTokens: true,
    // includeMatches: true,
    threshold: 0.3,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: [
      'name',
      'email',
      'jobTitle'
    ]
  };

  // currently showing data
  displayData: Array<any>;

  // the data for this table.
  data: Array<any>;
  _subscription: Subscription;
  private _sortBy: string;
  private _sortAsc = true;

  currentSort = <SortConfig>{};

  @Input()
  private limit = 10;

  _reloading = false;

  @Input() options: TableOptions;
  @Input() sortable = false;
  @Input() pagination = false;
  @Input() selectColumn = false;
  @Input() multiSelect = true;
  @Input() selectRowVisible = false;
  @Input() expandable = false;
  @Input() expandedRowIndex: number;
  @Input() showIndex;
  @Input() showExpandedRow: boolean;
  @Input() selectOnRowClick = false;
  @Input() autoReload = true;
  @Input() showReloading = false;
  @Input() headerTitle: string;
  @Input() header = true;

  @Output() reload = new EventEmitter();
  @Output() selectRowEventEmitter = new EventEmitter<ItemCheckedEvent>();

  offset = 0;
  itemCount: number;

  @ContentChild('dataTableExpand') expandTemplate: TemplateRef<any>;
  @ViewChild(DataTablePaginationComponent) dataTablePaginationComponent: DataTablePaginationComponent;

  itemPerPageSubscription: Subscription;

  columns: DataTableColumnComponent[] = [];

  constructor(private sortService: SortService,
    private itemsPerPageService: ItemsPerPageService,
    private datatableSearchService: DataTableSearchService,
    private modalService: NgbModal,
    private tableOptionsService: TableOptionsService,
    private fuseSearchService: FuseSearchService,
    private cd: ChangeDetectorRef) {
  }

  addColumn(dataTableColumn: DataTableColumnComponent) {
    this.columns.push(dataTableColumn);
  }

  ngOnInit() {
    this.tableOptionsService.currentTableOptions$.subscribe(tableOptions => {
      this.options = tableOptions;
      if (this.options && this.options.config && this.options.config.clientPaging) {
        this.itemCount = this.options.config.totalCount;
        this.limit = this.options.config.pageSize;
        console.log('client pagination in progress');

        this.data = this.options.records;
        if (this.pagination) {
          this.displayData = this.data.slice(this.offset, this.offset + this.limit);
        } else {
          this.displayData = this.data;
        }
        this.cd.markForCheck();

        this.registerItemsPerPage();
        this.registerFilter();

      } else {
        this.displayData = this.options.records;
        this.itemCount = this.options.config.totalCount;
        this.limit = this.options.config.pageSize;
        this.cd.markForCheck();
      }
    });
  }

  get loading(): boolean {
    return this._reloading;
  }
  set loading(loading: boolean) {
    this._reloading = loading;
  }

  registerItemsPerPage(): void {
    this.itemsPerPageService.itemCountUpdated$
      .subscribe(itemsPerPage => {
        if (itemsPerPage >= 0) {
          this.limit = itemsPerPage;
        }

        if (this.pagination) {
          console.log(`Offset for table: ${this.offset}`);
          this.displayData = this.data.slice(this.offset, this.offset + this.limit);
        } else {
          this.displayData = this.data;
        }
        this.cd.markForCheck();

      });
  }

  registerFilter(): any {
    this.datatableSearchService
      .searchTerm$
      .debounceTime(400)
      .distinctUntilChanged()
      .map(searchTerm => {
        // enforce a minimum search length of at least 3 characters.
        if (searchTerm && searchTerm.length >= 3) {
          return this.fuseSearchService.search(this.data, searchTerm, this.opts);
        }
        return this.data;
      })
      .subscribe(searchResults => {
        console.log(searchResults);
        this.itemCount = searchResults.length;
        this.offset = 0;
        if (this.pagination) {
          this.displayData = searchResults.slice(this.offset, this.offset + this.limit);
        } else {
          this.displayData = searchResults;
        }
        this.cd.markForCheck();
      });
  }

  // page change handler.
  onPageChange(offset) {
    this.offset = offset;
    if (!this.options.config.clientPaging) {
      const currentPage = (this.offset / this.limit) + 1;

      const pageLoadEvent = <PageChangeEvent>{
        page: currentPage,
        size: this.limit,
        eventType: PageChangeType.PAGE_CHANGE
      };

      if (this.sortable) {
        pageLoadEvent.sortable = true;

        if (this.options.config.sortBy) {
          pageLoadEvent.sortBy = this.options.config.sortBy;
        }
        if (this.options.config.sortDirection) {
          pageLoadEvent.sortDirection = this.options.config.sortDirection;
        }
      }
      this.reload.emit(pageLoadEvent);
    } else {
      this.offset = offset;
      if (this.pagination) {
        this.displayData = this.data.slice(this.offset, this.offset + this.limit);
      } else {
        this.displayData = this.data;
      }
    }
  }

  reloadData() {
    if (!this.options || !this.options.config || !this.options.config.clientPaging) {
      this.itemCount = this.options.config.totalCount;
      this.cd.markForCheck();
    }
  }

  // open the items per page modal window.
  changeItemsPerPage($event) {
    const modalRef = this.modalService.open(ItemPerPageComponent);
    modalRef.componentInstance.itemsPerPage = this.limit;
  }

  toggleRowExpansion(row: any, rowNum: number) {
    if (this.showExpandedRow && (this.expandedRowIndex === rowNum)) {
      this.showExpandedRow = false;
      this.expandedRowIndex = null;
    } else {
      this.showExpandedRow = true;
      this.expandedRowIndex = rowNum;
      this.cd.markForCheck();
    }
  }

  selectRow(row: any, idx: number, event) {
    const itemCheckedEvent = <ItemCheckedEvent>{
      row: row,
      index: idx,
      checked: event.target.checked
    };
    this.selectRowEventEmitter.emit(itemCheckedEvent);
  }

  headerClicked(column: DataTableColumnComponent, event) {
    if (column.sortable) {
      if (!this.options.config.sortBy) {
        this.options.config.sortBy = column.name;
        this.options.config.sortDirection = 'asc';
      } else {
        console.log(`=> ${this.options.config.sortBy}, new column sort: ${column.name}`);
        if (this.options.config.sortBy !== column.name || !this.options.config.sortDirection) {
          this.options.config.sortBy = column.name;
          this.options.config.sortDirection = 'asc';
        } else {
          this.options.config.sortBy = column.name;
          this.options.config.sortDirection = (this.options.config.sortDirection === 'asc') ? 'desc' : 'asc';
        }
      }
      // reset all other columns sort direction
      this.columns.forEach(col => {
        if (col.sortable && col.name === column.name) {
          col.sortDirection = this.options.config.sortDirection;
        }
        if (col.sortable && col.name !== column.name) {
          col.sortDirection = '';
        }
      });

      if (this.options.config.clientPaging) {

      } else {
        // this is sorting on server
        if (this.sortable) {
          const currentPage = (this.offset / this.limit) + 1;

          const pageLoadEvent = <PageChangeEvent>{
            page: currentPage,
            size: this.limit,
            sortBy: this.options.config.sortBy,
            sortDirection: this.options.config.sortDirection,
            eventType: PageChangeType.COLUMN_SORTED
          };
          pageLoadEvent.sortable = true;
          this.reload.emit(pageLoadEvent);
        }
      }
    }
  }

  public ngOnDestroy(): void {
    this.itemPerPageSubscription.unsubscribe();
  }

  get columnCount() {
    let columnCount = this.columns.length;
    columnCount = (this.showIndex) ? columnCount + 1 : columnCount;
    columnCount = (this.expandable) ? columnCount + 1 : columnCount;
    columnCount = (this.selectRowVisible) ? columnCount + 1 : columnCount;
    return columnCount;
  }
}

export interface SortConfig {
  direction?: string;
  column?: string;
}
