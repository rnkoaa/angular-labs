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
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DataTableColumnComponent } from './data-table-column.component';
import { FuseSearchService } from '../services/fuse-search.service';
import { SortService } from '../services/sort.service';
import { TableOptions } from '../models/table-options';
import { DataTableSearchService } from '../services/data-table-search.service';
import { ItemsPerPageService } from '../services/items-per-page.service';
import { PageChangeEvent, PageChangeType } from '../models/page-change-event';
import { DataTablePaginationComponent } from './data-table-pagination.component';
import { ItemCheckedEvent } from '../models/data-table-checked-event';
import { SelectedItem } from '../models/selected-item';
import { RowItem } from '../models/row-item';
import { DataTableResourceService } from '../services/data-table-resource.service';

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
  displayData: Array<RowItem>;
  selectedItem: SelectedItem;
  selectedItems: Array<SelectedItem> = [];

  // the data for this table.
  data: Array<RowItem>;
  _subscription: Subscription;
  private _sortBy: string;
  private _sortAsc = true;

  @Input()
  limit = 10;

  loading = false;

  @Input() options: TableOptions;
  @Input() sortable = false;
  @Input() pagination = false;
  @Input() selectColumn = false;
  @Input() multiSelect = false;
  @Input() selectRowVisible = false;
  @Input() expandable = false;
  @Input() expandedRowIndex: number;
  @Input() showIndex;
  @Input() showExpandedRow: boolean;
  @Input() selectOnRowClick = false;
  @Input() autoReload = true;
  @Input() showLoading = false;
  @Input() headerTitle: string;
  @Input() header = true;

  @Output() reload = new EventEmitter();
  @Output() selectRows = new EventEmitter<SelectedItem[]>();

  offset = 0;
  itemCount: number;

  @ContentChild('dataTableExpand') expandTemplate: TemplateRef<any>;
  @ViewChild(DataTablePaginationComponent) dataTablePaginationComponent: DataTablePaginationComponent;

  itemPerPageSubscription: Subscription;

  columns: DataTableColumnComponent[] = [];

  constructor(private sortService: SortService,
    private itemsPerPageService: ItemsPerPageService,
    private datatableSearchService: DataTableSearchService,
    private tableResourceService: DataTableResourceService,
    private fuseSearchService: FuseSearchService,
    private cd: ChangeDetectorRef) {
  }

  addColumn(dataTableColumn: DataTableColumnComponent) {
    this.columns.push(dataTableColumn);
  }

  ngOnInit() {
    console.log(`Is MultiSelect: ${this.multiSelect}`);
    this.tableResourceService.currentTableOptions$.subscribe(tableOptions => {
      this.options = tableOptions;
      if (this.options && this.options.config && this.options.config.clientPaging) {
        this.itemCount = this.options.config.totalCount;
        this.limit = this.options.config.pageSize;
        console.log('client pagination in progress');

        if (this.options.showLoader) {
          this.showLoading = this.options.showLoader;
          this.loading = this.options.loading;
        }

        // this.data = this.options.records;
        if (this.options.records) { // data is still loading.
          this.data = this.convertItems(this.options.records);
          if (this.pagination) {
            this.displayData = this.data.slice(this.offset, this.offset + this.limit);
          } else {
            this.displayData = this.data;
          }
          this.cd.markForCheck();
        }

        this.registerItemsPerPage();
        this.registerFilter();
      } else {
        if (this.options.records) {
          this.data = this.convertItems(this.options.records);
          // this.displayData = this.convertItems(this.options.records);
          this.displayData = this.data;
          this.itemCount = this.options.config.totalCount;
          this.limit = this.options.config.pageSize;
          console.log(`Total Item Count: ${this.itemCount}, Limit: ${this.limit}`);
          // console.log(this.displayData);
          // this.cd.markForCheck();

          this.cd.markForCheck();
        }
      }
    });
  }

  registerItemsPerPage(): void {
    this.itemsPerPageService.itemCountUpdated$
      .subscribe(itemsPerPage => {
        if (itemsPerPage >= 0) {
          this.limit = itemsPerPage;

          if (this.pagination && this.data) {
            this.displayData = this.data.slice(this.offset, this.offset + this.limit);
          } else {
            this.displayData = this.data;
          }
          this.cd.markForCheck();
        }
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
          const response =  this.fuseSearchService.search(this.data, searchTerm, this.opts);
          return this.convertItems(response);
        } else {
          return this.data;
        }
      })
      .subscribe(searchResults => {
        this.itemCount = searchResults.length;
        this.offset = 0;
        if (this.pagination) {
          this.displayData = this.data.slice(this.offset, this.offset + this.limit);
        } else {
          this.displayData = this.data;
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

  selectRow(row: RowItem, idx: number, event) {
    const currentRowNumber = this.offset + idx + 1;

    if (event.target.checked) {
      row.selected = true;
    } else {
      row.selected = false;
    }

    const selectedRow = <SelectedItem>{
      selected: row.selected,
      rowNumber: currentRowNumber,
      item: row,
      index: idx,
      offset: this.offset
    };

    // maintain the selectedRow(s) view
    if (this.multiSelect) {
      const index = this.selectedItems.findIndex(k => k.rowNumber === currentRowNumber);
      if (row.selected && index < 0) {
        this.selectedItems.push(selectedRow);
      } else if (!row.selected && index >= 0) {
        this.selectedItems.splice(index, 1);
      }
    } else {
      console.log(row.selected);
      if (row.selected) {
        this.selectedItem = selectedRow;
      } else if (this.selectedItem === selectedRow) {
        this.selectedItem = undefined;
      }
      console.log(this.selectedItem);
    }

    // unselect all other rows.
    if (row.selected && !this.multiSelect) {
      this.data.filter(_row => _row.selected)
        .forEach(_row => {
          if (_row !== row) { // avoid endless loop
            _row.selected = false;
          }
        });
      this.selectedItems = [selectedRow];
    }

    // console.log(`RowNumber: ${currentRowNumber} Selected items length: ${this.selectedItems.length}`);
    this.selectRows.emit(this.selectedItems);
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
        this.data = this.sortService.sort(this.data, this.options.config.sortBy, this.options.config.sortDirection);
        if (this.pagination) {
          this.displayData = this.data.slice(this.offset, this.offset + this.limit);
        } else {
          this.displayData = this.data;
        }
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

  isSelected(rowItem: RowItem): boolean {
    // this.selectedItems
    const currentRowNumber = this.offset + rowItem.index + 1;
    const index = this.selectedItems.findIndex(k => k.rowNumber === currentRowNumber);
    return index > -1;
  }

  convertItems(items: Array<any>): Array<RowItem> {
    return items.map((currentItem, idx) => {
      const rowItem = new RowItem(currentItem, idx);
      rowItem.selected = this.isSelected(rowItem);
      return rowItem;
    });
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
