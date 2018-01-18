import { Store } from '@ngrx/store';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RepoService } from '../services/repo.service';
import { GithubRepository, GithubResponse } from '../../models';
import {
  TableConfig,
  TableOptions,
  PageChangeEvent
} from '../../shared/data-table';
import { Observable } from 'rxjs/Observable';
import { DataTableResourceService } from '../../shared/data-table/services/data-table-resource.service';
import { PageNumber } from '../../shared/data-table/models/page-number';
import { RepoModuleState, getAllRepos } from '../store';

import * as fromRepos from '../store/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  repos$: Observable<GithubResponse>;

  // dataTableComponent: DataTableComponent;

  // @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;

  constructor(
    private store: Store<RepoModuleState>,
    private reposService: RepoService,
    private tableResourceService: DataTableResourceService
  ) {
    this.repos$ = this.store.select(getAllRepos);
    this.store.dispatch(new fromRepos.GetRepos(this.defaultParams()));
  }

  ngOnInit() {
    this.repos$.subscribe((res: GithubResponse) => {
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

  reload(event: PageChangeEvent) {
    console.log(`Got Reload Event: ${JSON.stringify(event)}`);
    const httpParams = this.createParams(event);
    this.store.dispatch(new fromRepos.GetRepos(this.createParams(event)));
  }

  private defaultParams(): HttpParams {
    return new HttpParams().set('page', '1').set('size', '10');
  }

  private createParams(event: PageChangeEvent): HttpParams {
    let httpParams = new HttpParams();
    if (event.page) {
      httpParams = httpParams.set('page', `${event.page}`);
    }
    if (event.size) {
      httpParams = httpParams.set('size', `${event.size}`);
    }
    if (event.sortBy) {
      httpParams = httpParams.set('sort', `${event.sortBy}`);
    }
    if (event.sortDirection) {
      httpParams = httpParams.set('direction', `${event.sortDirection}`);
    }
    return httpParams;
  }
}
