import { TableConfig } from './table-config';
import { ColumnDefinition } from './column-definition';
import { Observable } from 'rxjs/Observable';

export interface TableOptions {
  // records: Observable<Array<any>>;
  records: Array<any>;
  columns: Array<ColumnDefinition>;
  rowDefns?: Array<any>;
  config?: TableConfig;
  callbacks?: any;
}
