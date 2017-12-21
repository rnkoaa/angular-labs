import { ItemsPerPageService } from './data-table/items-per-page.service';
import { FormsModule } from '@angular/forms';
import { SortService } from './sort.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { DataTableColumnComponent } from './data-table-column/data-table-column.component';
import { DataTablePaginationComponent } from './data-table-pagination/data-table-pagination.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemPerPageComponent } from './data-table/item-per-page.component';

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
    ItemsPerPageService],
  declarations: [
    DataTableComponent,
    DataTableColumnComponent,
    ItemPerPageComponent,
    DataTablePaginationComponent]
})
export class DataTableModule { }
