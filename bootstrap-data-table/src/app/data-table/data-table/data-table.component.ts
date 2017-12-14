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
  constructor() {
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
    console.log(`Sortable: ${this.sortable}`);
    this.data = this.options.records;
    this.itemCount = this.options.records.length;
    if (this.pagination) {
      console.log(`Pagination: ${this.pagination}`);
      this.displayData = this.data.slice(this.offset, this.limit);
      // this.displayData = this.options.records;
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

}
