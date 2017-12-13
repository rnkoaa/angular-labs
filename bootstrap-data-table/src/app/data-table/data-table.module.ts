import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { DataTableColumnComponent } from './data-table-column/data-table-column.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DataTableComponent,
    DataTableColumnComponent
  ],
  declarations: [DataTableComponent, DataTableColumnComponent]
})
export class DataTableModule { }
