import { DataTableSearchService } from './data-table/data-table-search.service';
import { DataTableEntriesComponent } from './data-table/data-table-entries.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DataTableColumnComponent } from './data-table-column/data-table-column.component';
import { DataTablePaginationComponent } from './data-table-pagination/data-table-pagination.component';
import { DataTableSearchComponent } from './data-table/data-table-search.component';
import { DataTableComponent } from './data-table/data-table.component';
import { ItemPerPageComponent } from './data-table/item-per-page.component';
import { ItemsPerPageService } from './data-table/items-per-page.service';
import { SortService } from './sort.service';

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
  providers: [SortService,
    ItemsPerPageService,
    DataTableSearchService],
  declarations: [
    DataTableComponent,
    DataTableColumnComponent,
    DataTableSearchComponent,
    ItemPerPageComponent,
    DataTableEntriesComponent,
    DataTablePaginationComponent]
})
export class DataTableModule { }
