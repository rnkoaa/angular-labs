import { GithubService, GithubResponse } from './github.service';
import { ColumnDefinition } from '../data-table/column-definition';
import { DataTableComponent } from '../data-table/data-table/data-table.component';
import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TableOptions } from '../data-table/table-options';
import { TableConfig } from '../data-table/table-config';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as persons from './persons.json';

import 'rxjs/add/observable/of';
import { PageChangeEvent, PageChangeType } from '../data-table/page-change-event';
import { TableOptionsService } from '../data-table/data-table/table-options.service';

@Component({
  selector: 'app-remote',
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.css']
})
export class RemoteComponent implements OnInit, AfterViewInit {
  title = 'app';
  public hasChanges = true;

  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;

  constructor(private githubService: GithubService,
    private tableOptionsService: TableOptionsService) {
  }

  public ngOnInit(): void {

    const initialPageChangeEvent = <PageChangeEvent>{
      page: 1,
      size: 10
    };

    this.githubService.getRepositories(initialPageChangeEvent)
      .subscribe(res => {
        const options = <TableOptions>{
          records: res.data,
          loading: false,
          config: <TableConfig>{
            clientPaging: false,
            pageSize: res.size,
            sortBy: res.sort,
            sortDirection: res.direction,
            pageNumber: res.page,
            clientSort: false,
            totalCount: res.total
          }
        };
        this.tableOptionsService.updateOptions(options);
      });
  }

  ngAfterViewInit() {

  }

  canDeactivate() {
    return Observable.of(!this.hasChanges);
  }

  reload(event: PageChangeEvent) {
    console.log(`Got Reload Event: ${JSON.stringify(event)}`);

    this.githubService.getRepositories(event)
      .subscribe(res => {
        const options = <TableOptions>{
          records: res.data,
          config: <TableConfig>{
            clientPaging: false,
            pageSize: res.size,
            sortBy: res.sort,
            sortDirection: res.direction,
            pageNumber: res.page,
            clientSort: false,
            totalCount: res.total
          }
        };
        this.tableOptionsService.updateOptions(options);
      });
  }
}
