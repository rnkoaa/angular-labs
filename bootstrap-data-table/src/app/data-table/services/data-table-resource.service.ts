import { TableConfig } from '../models/table-config';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TableOptions } from '../models/table-options';

@Injectable()
export class DataTableResourceService {
  private tableOptions$ = new BehaviorSubject<TableOptions>(<TableOptions>{
    config: <TableConfig>{
      clientPaging: false,
      maxSize: 10
    }
  });

  currentTableOptions$ = this.tableOptions$.asObservable();

  constructor() { }

  updateOptions(options: TableOptions) {
    this.tableOptions$.next(options);
  }
}
