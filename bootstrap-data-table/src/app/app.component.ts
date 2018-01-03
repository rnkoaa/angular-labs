import { ColumnDefinition } from './data-table/column-definition';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableOptions } from './data-table/table-options';
import { TableConfig } from './data-table/table-config';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as persons from './persons.json';

import 'rxjs/add/observable/of';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // console.log('App Component');
  }
}
