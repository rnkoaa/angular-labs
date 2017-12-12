import { ColumnDefinition } from './data-table/column-definition';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableOptions } from './data-table/table-options';
import { TableConfig } from './data-table/table-config';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/of';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private _lipsum: any;
  title = 'app';
  public hasChanges = true;

  public records: Array<any> = [];

  tableOptions: TableOptions;
  tableConfig: TableConfig;

  private tableSubject: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  public tableObserve: Observable<Array<any>> = this.tableSubject.asObservable();

  private filterSubject: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  public filterObserve: Observable<Array<any>> = this.filterSubject.asObservable();

  users: Array<any>;

  public ngOnInit(): void {
    this.users = [
      {
        username: 'Pompeius René', registered: '01/01/2012', role: 'Member', active: true, status: 'Active'
      },
      {
        username: 'Paĉjo Jadon', registered: '01/02/2012', role: 'Staff', active: true, status: 'Banned'
      },
      {
        username: 'Micheal Mercurius', registered: '01/02/2012', role: 'Admin', active: false, status: 'Inactive'
      },
      {
        username: 'Ganesha Dubhghall', registered: '06/02/2012', role: 'Member', active: true, status: 'Pending'
      },
      {
        username: 'Hiroto Šimun', registered: '21/02/2012', role: 'Member', active: false, status: 'Active'
      }
    ];

    this.initTableOptions();
  }

  initTableOptions(): any {
    const columns: ColumnDefinition[] = [
      {
        name: 'Username',
        binding: 'username',
        value: 'username'
      },
      {
        name: 'registered',
        binding: 'registered',
        value: 'Date Registered'
      },
      {
        name: 'role',
        binding: 'role',
        value: 'Role'
      },
      {
        name: 'active',
        binding: 'active',
        value: 'Active'
      },
      {
        name: 'status',
        binding: 'status',
        value: 'Status'
      }
    ];

    this.tableOptions = <TableOptions>{
        records: this.users,
        columns: columns
    };
  }

  canDeactivate() {
    console.log('Detecting changes. Has Changes: ' + this.hasChanges);
    return Observable.of(!this.hasChanges);
  }
}
