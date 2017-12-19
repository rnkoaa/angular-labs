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
  }

  @Input()
  get sortAsc() {
    return this._sortAsc;
  }

  set sortAsc(value) {
    this._sortAsc = value;
  }

  @Input()
  get limit() {
    return this._limit;
  }

  set limit(value) {
    this._limit = value;
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

  addColumn(dataTableColumn: DataTableColumnComponent) {
    this.columns.push(dataTableColumn);
  }

  ngOnInit() {
    this.sortAsc = true;
    this.data = this.options.records;
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

      this.data = this.sorterService.sort(this.data, this.options.config.sortBy, this.options.config.sortDirection);
      this.displayData = this.data.slice(this.offset, this.offset + this.limit);

      this.columns.forEach(col => {
        if (col.sortable && col.value === column.value) {
          col.sortDirection = this.options.config.sortDirection;
        }
        if (col.sortable && col.value !== column.value) {
          col.sortDirection = '';
        }
      });
    }
  }
}
