import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { DataTableComponent } from './data-table.component';
import { SortService } from '../services/sort.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'dt-column',
  template: ``,
  styleUrls: ['./data-table-column.component.css']
})
export class DataTableColumnComponent implements OnInit {

  @Input() name;
  @Input() width: number;
  @Input() header;
  @Input() sortable = false;
  @Input() sortDirection = '';

  @ContentChild('tableHeaderTemplate') headerTemplate: TemplateRef<any>;
  @ContentChild('tableBodyTemplate') bodyTemplate: TemplateRef<any>;

  private styleClassObject = {}; // for [ngClass]

  constructor(dataTable: DataTableComponent, private sortService: SortService) {
    dataTable.addColumn(this);
  }

  ngOnInit() {

  }

}
