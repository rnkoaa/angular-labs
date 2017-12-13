import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { DataTableComponent } from '../data-table/data-table.component';

@Component({
  selector: 'app-data-table-column',
  templateUrl: './data-table-column.component.html',
  styleUrls: ['./data-table-column.component.css']
})
export class DataTableColumnComponent implements OnInit {

  @Input() value;
  @Input() header;
  @ContentChild('tableHeaderTemplate') headerTemplate: TemplateRef<any>;
  @ContentChild('tableBodyTemplate') bodyTemplate: TemplateRef<any>;

  constructor(table: DataTableComponent) {
    table.addColumn(this);
  }

  ngOnInit() {
  }

}
