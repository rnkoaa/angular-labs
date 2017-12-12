import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DataTableComponent
  ],
  declarations: [DataTableComponent]
})
export class DataTableModule { }
