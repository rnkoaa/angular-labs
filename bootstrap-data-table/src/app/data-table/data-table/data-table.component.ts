import { ColumnDefinition } from '../column-definition';
import { ApplicationRef, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TableOptions } from '../table-options';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/observable/of';
import { CellDefinition } from '../cell-definition';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() options: TableOptions;
  @Input() data: Array<any>;
  constructor(private changeRef: ChangeDetectorRef,
    private appRef: ApplicationRef) {
  }

  ngOnInit() {

  }

 public getCellValue(row: any, column: ColumnDefinition): string {
    return row[column.binding];
  }

}
