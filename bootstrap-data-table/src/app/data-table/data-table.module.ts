import { LoadingComponent } from './components/loading.component';
import { DataTableSearchService } from './services/data-table-search.service';
import { DataTableEntriesComponent } from './components/data-table-entries.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DataTableColumnComponent } from './components/data-table-column.component';
import { DataTablePaginationComponent } from './components/data-table-pagination.component';
import { DataTableSearchComponent } from './components/data-table-search.component';
import { DataTableComponent } from './components/data-table.component';
import { ItemPerPageComponent } from './components/item-per-page.component';
import { ItemsPerPageService } from './services/items-per-page.service';
import { SortService } from './services/sort.service';
import { FuseSearchService } from './services/fuse-search.service';
import { SortableColumnDirective } from './directives/sortable-column.directive';
import { DataTableResourceService } from './services/data-table-resource.service';

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
    DataTableResourceService,
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
