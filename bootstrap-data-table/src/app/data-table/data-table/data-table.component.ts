import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
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
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DataTableColumnComponent } from '../data-table-column/data-table-column.component';
import { FuseSearchService } from '../fuse-search.service';
import { SortService } from '../sort.service';
import { TableOptions } from '../table-options';
import { DataTableSearchService } from './data-table-search.service';
import { ItemPerPageComponent } from './item-per-page.component';
import { ItemsPerPageService } from './items-per-page.service';

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
    private datatableSearchService: DataTableSearchService,
    private modalService: NgbModal,
    private fuseSearchService: FuseSearchService,
    private cd: ChangeDetectorRef) {
  }

  addColumn(dataTableColumn: DataTableColumnComponent) {
    this.columns.push(dataTableColumn);
  }

  ngOnInit() {
    this.data = this.options.records;
    this.osbservableData$ = Observable.of(this.data);
    this.itemCount = this.options.records.length;

    // when the items per page is changed, we need to reload data.
    this.itemsPerPageService.itemCountUpdated$
      .switchMap(itemPerPage => {
        this.limit = itemPerPage;
        return this.osbservableData$;
      })
      .subscribe(items => {
        this.displayData = items.slice(this.offset, this.offset + this.limit);
        this.cd.markForCheck();
      });

    this.registerFilter();

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

  registerFilter(): any {
    this.datatableSearchService.searchTerm$
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => {
        const result = this.fuseSearchService.searchObservable(this.osbservableData$, term, this.opts);
        return result.toArray();
      })
      .subscribe(items => {
        this.itemCount = items.length;
        this.offset = 0;
        this.displayData = items.slice(this.offset, this.offset + this.limit);
        this.cd.markForCheck();
      });


  }

  // page change handler.
  onPageChange(offset) {
    this.offset = offset;
    this.osbservableData$
      .subscribe(items => {
        console.log(`Items Length ${items.length}`);
        this.displayData = items.slice(this.offset, this.offset + this.limit);
      });
  }

  // open the items per page modal window.
  changeItemsPerPage($event) {
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
