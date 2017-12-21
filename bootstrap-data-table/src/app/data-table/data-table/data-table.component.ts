import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableColumnComponent } from '../data-table-column/data-table-column.component';
import { ColumnDefinition } from '../column-definition';
import {
    ApplicationRef,
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
import { ItemPerPageComponent } from './item-per-page.component';
import { ItemsPerPageService } from './items-per-page.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit, OnDestroy {
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

  itemPerPageSubscription: Subscription;

  columns: DataTableColumnComponent[] = [];

  constructor(private sortService: SortService,
    private itemsPerPageService: ItemsPerPageService,
    private modalService: NgbModal,
    private cd: ChangeDetectorRef) {
  }

  addColumn(dataTableColumn: DataTableColumnComponent) {
    this.columns.push(dataTableColumn);
  }

  ngOnInit() {
    this.data = this.options.records;
    this.osbservableData$ = Observable.of(this.data);
    this.itemCount = this.options.records.length;

    this.itemPerPageSubscription = this.itemsPerPageService.itemCountUpdated$
      .subscribe(itemPerPage => {
        this.limit = itemPerPage;
        this.osbservableData$
          .subscribe(items => {
            this.displayData = items.slice(this.offset, this.offset + this.limit);
            this.cd.markForCheck();
          });
      });

    if (this.pagination) {
      this.osbservableData$
        .subscribe(items => {
          this.displayData = items.slice(this.offset, this.offset + this.limit);
        });
    } else {
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

  changeItemsPerPage($event) {
    console.log('change Items Per Page');
    const modalRef = this.modalService.open(ItemPerPageComponent);
    modalRef.componentInstance.itemsPerPage = this.limit;
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

  public ngOnDestroy(): void {
    // throw new Error('Not implemented yet.');
    this.itemPerPageSubscription.unsubscribe();
  }
}
