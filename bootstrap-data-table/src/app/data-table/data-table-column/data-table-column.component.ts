import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { DataTableComponent } from '../data-table/data-table.component';
import { SortService } from '../sort.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-data-table-column',
  templateUrl: './data-table-column.component.html',
  styleUrls: ['./data-table-column.component.css']
})
export class DataTableColumnComponent implements OnInit {

  @Input() value;
  @Input() header;
  @Input() sortable = false;
  @Input() sortDirection = '';

  @ContentChild('tableHeaderTemplate') headerTemplate: TemplateRef<any>;
  @ContentChild('tableBodyTemplate') bodyTemplate: TemplateRef<any>;


  private styleClassObject = {}; // for [ngClass]

  private columnSortedSubscription: Subscription;

  constructor(table: DataTableComponent, private sortService: SortService) {
    table.addColumn(this);
  }

  ngOnInit() {
    // console.log(`header: ${this.header} with sortable: ${this.sortable}`);
    // subscribe to sort changes so we can react when other columns are sorted
    // this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
    //   // reset this column's sort direction to hide the sort icons
    //   if (this.header !== event.column) {
    //     console.log(`${this.header} changing to empty`);
    //     this.sortDirection = '';
    //   }
    // });
  }

}
