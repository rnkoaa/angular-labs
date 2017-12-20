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
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';


import { SortService } from '../sort.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {


  displayData: Array<any>;
  displayData$: Observable<Array<any>>;
  osbservableData$: Observable<Array<any>>;
  _subscription: Subscription;
  private _sortBy: string;
  private _sortAsc = true;

  @Input()
  private limit = 10;

  _reloading = false;

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

  constructor(private sortService: SortService) {
  }

  addColumn(dataTableColumn: DataTableColumnComponent) {
    this.columns.push(dataTableColumn);
  }

  ngOnInit() {
    this.data = this.options.records;
    this.osbservableData$ = Observable.of(this.data);
    this.itemCount = this.options.records.length;

    if (this.pagination) {
      this.osbservableData$
        .subscribe(items => {
          this.displayData = items.slice(this.offset, this.offset + this.limit);
        });
    } else {
      // this.displayData$ = this.osbservableData$.toArray();
      this.osbservableData$
        .subscribe(items => {
          this.displayData = items;
        });
    }
  }

  onPageChange(offset) {
    this.offset = offset;
    console.log(`Offset => ${this.offset}`);


    this.osbservableData$
      .subscribe(items => {
        console.log(`Items Length ${items.length}`);
        this.displayData = items.slice(this.offset, this.offset + this.limit);
      });
  }

  headerClicked(column: DataTableColumnComponent, event) {
    if (column.name && column.sortable) {
      if (this.options.config.sortBy === undefined) {
        this.options.config.sortBy = column.name;
      }

      if (this.options.config.sortBy === column.name) {
        this.options.config.sortDirection = this.options.config.sortDirection === 'asc' ? 'desc' : 'asc';
      }
      this.options.config.sortBy = column.name;

      this.osbservableData$ = this.osbservableData$
        .map(itemArray => {
          console.log(itemArray.length);
          return this.sortService.sort(itemArray, this.options.config.sortBy, this.options.config.sortDirection);
        });

      this.osbservableData$
        .subscribe(items => {
          console.log(items.length);
          this.displayData = items.slice(this.offset, this.offset + this.limit);
        });


      //   return this.sortService.sort(items, this.options.config.sortBy, this.options.config.sortDirection);
      // });

      // this.displayData$ = this.osbservableData$
      //   .skip(this.offset)
      //   .take(this.limit)
      //   .toArray();

      this.columns.forEach(col => {
        if (col.sortable && col.name === column.name) {
          col.sortDirection = this.options.config.sortDirection;
        }
        if (col.sortable && col.name !== column.name) {
          col.sortDirection = '';
        }
      });
    }
  }
}
