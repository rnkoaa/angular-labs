import { CustomerService } from './customer.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SortableColumnComponent } from './sortable-column/sortable-column.component';
import { SortableTableDirective } from './sortable-table.directive';
import { SortService } from './sort.service';
import { SortableColumnDirective } from './sortable-column.directive';


@NgModule({
  declarations: [
    AppComponent,
    SortableColumnComponent,
    SortableTableDirective,
    SortableColumnDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [CustomerService,
    SortService],
  bootstrap: [AppComponent]
})
export class AppModule { }
