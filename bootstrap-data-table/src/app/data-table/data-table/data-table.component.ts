import { DataTableColumnComponent } from '../data-table-column/data-table-column.component';
import { ColumnDefinition } from '../column-definition';
import {
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TableOptions } from '../table-options';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/observable/of';
import { SorterService } from '../sorter.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  private _sortBy: string;
  private _sortAsc = true;
  private _limit = 10;

  // Reloading:

  _reloading = false;

  _scheduledReload = null;

  displayData: Array<any>;
  @Input() options: TableOptions;
  @Input() data: Array<any>;
  @Input() sortable = false;
  @Input() pagination = false;
  @Input() selectColumn = false;
  @Input() multiSelect = true;
  @Input() expandableRows = false;
  @Input() selectOnRowClick = false;
  @Input() autoReload = true;
  @Input() showReloading = false;
  @Input() headerTitle: string;
  @Input() header = true;

  @Output() reload = new EventEmitter();

  offset = 0;
  itemCount: number;

  @ContentChild('dataTableExpand') expandTemplate: TemplateRef<any>;

  columns: DataTableColumnComponent[] = [];
  constructor(private sorterService: SorterService) {
  }

  @Input()
  get sortBy() {
    return this._sortBy;
  }

  set sortBy(value) {
    this._sortBy = value;
    this._triggerReload();
  }

  @Input()
  get sortAsc() {
    return this._sortAsc;
  }

  set sortAsc(value) {
    this._sortAsc = value;
    this._triggerReload();
  }

  @Input()
  get limit() {
    return this._limit;
  }

  set limit(value) {
    this._limit = value;
    this._triggerReload();
  }

  // calculated property:

  @Input()
  get page() {
    return Math.floor(this.offset / this.limit) + 1;
  }

  set page(value) {
    this.offset = (value - 1) * this.limit;
  }

  get lastPage() {
    return Math.ceil(this.itemCount / this.limit);
  }

  // setting multiple observable properties simultaneously

  sort(sortBy: string, asc: boolean) {
    this.sortBy = sortBy;
    this.sortAsc = asc;
  }

  // for avoiding cascading reloads if multiple params are set at once:
  _triggerReload() {
    if (this._scheduledReload) {
      clearTimeout(this._scheduledReload);
    }
    this._scheduledReload = setTimeout(() => {
      this.reloadItems();
    });
  }

  reloadItems() {
    this._reloading = true;
    // this.reload.emit(this._getRemoteParameters());
  }

  // functions:
  private _getRemoteParameters(): any {
    const params = <any>{};

    if (this.sortBy) {
      params.sortBy = this.sortBy;
      params.sortAsc = this.sortAsc;
    }
    if (this.pagination) {
      params.offset = this.offset;
      params.limit = this.limit;
    }
    return params;
  }


  addColumn(dataTableColumn: DataTableColumnComponent) {
    this.columns.push(dataTableColumn);
  }

  ngOnInit() {
    this.sortAsc = true;
    this.data = this.options.records;

    // console.log(this.sorterService.sort(this.data, 'name'));
    this.itemCount = this.options.records.length;
    if (this.pagination) {
      this.displayData = this.data.slice(this.offset, this.limit);
    } else {
      this.displayData = this.data;
    }
  }

  public getCellValue(row: any, column: ColumnDefinition): string {
    return row[column.binding];
  }

  onPageChange(offset) {
    this.offset = offset;
    this.displayData = this.data.slice(this.offset, this.offset + this.limit);
  }

  headerClicked(column: DataTableColumnComponent, event) {
    if (column.value && column.sortable) {
      if (this.options.config.sortBy === undefined) {
        this.options.config.sortBy = column.value;
      }
      if (this.options.config.sortBy === column.value) {
        this.options.config.sortDirection = this.options.config.sortDirection === 'asc' ? 'desc' : 'asc';
      }
      this.options.config.sortBy = column.value;

      this.displayData = this.sorterService.sort(this.data, this.options.config.sortBy, this.options.config.sortDirection);
    }
    // if (column.value && column.sortable) {
    //   if (this.options.config.sortBy === column.value) {
    //     this.options.config.sortDirection = this.options.config.sortDirection === 'asc' ? 'desc' : 'asc';
    //   }
    //   this.options.config.sortBy = column.value;

    // this.sort(this.displayData, this.options.config.sortBy, this.options.config.sortDirection, isNumeric);
    // const isNumeric = (column.filter && column.filter.indexOf("currency") != -1) || (column.isNumeric === true);
    // Get the matching column
    // const dtColumn = this.options.columns
    // .filter((iColumn) => iColumn.value === this.options.config.sortBy)[0];
    // const isNumeric = (dtColumn.filter && dtColumn.filter.indexOf("currency") != -1) || (dtColumn.isNumeric === true);
    // this.sort(this.filteredData, this.options.config.sortBy, this.options.config.sortDirection, isNumeric);
    // }
  }

  isSorting(name: string) {
    return this.options.config.sortBy !== name && name !== '';
  }

  isSortAsc(name: string) {
    return this.options.config.sortBy === name && this.options.config.sortDirection === 'asc';
  }

  isSortDesc(name: string) {
    return this.options.config.sortBy === name && this.options.config.sortDirection === 'desc';
  }

}
