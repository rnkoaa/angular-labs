import { GithubService, GithubResponse } from './github.service';
import { ColumnDefinition } from '../data-table/models/column-definition';
import { DataTableComponent } from '../data-table/components/data-table.component';
import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TableOptions } from '../data-table/models/table-options';
import { TableConfig } from '../data-table/models/table-config';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as persons from './persons.json';

import 'rxjs/add/observable/of';
import { PageChangeEvent, PageChangeType } from '../data-table/models/page-change-event';
import { DataTableResourceService } from '../data-table/services/data-table-resource.service';

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
    private tableResourceService: DataTableResourceService) {
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
        this.tableResourceService.updateOptions(options);
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
        this.tableResourceService.updateOptions(options);
      });
  }
}
