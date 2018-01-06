import { LoadingComponent } from './data-table/loading.component';
import { TableOptionsService } from './data-table/table-options.service';
import { DataTableSearchService } from './data-table/data-table-search.service';
import { DataTableEntriesComponent } from './data-table/data-table-entries.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DataTableColumnComponent } from './data-table/data-table-column.component';
import { DataTablePaginationComponent } from './data-table-pagination/data-table-pagination.component';
import { DataTableSearchComponent } from './data-table/data-table-search.component';
import { DataTableComponent } from './data-table/data-table.component';
import { ItemPerPageComponent } from './data-table/item-per-page.component';
import { ItemsPerPageService } from './data-table/items-per-page.service';
import { SortService } from './sort.service';
import { FuseSearchService } from './fuse-search.service';
import { SortableColumnDirective } from './sortable-column.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  entryComponents: [
    ItemPerPageComponent
  ],
  exports: [
    DataTableComponent,
    DataTableColumnComponent
  ],
  providers: [
    TableOptionsService,
    SortService,
    ItemsPerPageService,
    DataTableSearchService,
    FuseSearchService
  ],
  declarations: [
    DataTableComponent,
    LoadingComponent,
    DataTableColumnComponent,
    DataTableSearchComponent,
    ItemPerPageComponent,
    DataTableEntriesComponent,
    DataTablePaginationComponent,
    SortableColumnDirective
  ]
})
export class DataTableModule { }
