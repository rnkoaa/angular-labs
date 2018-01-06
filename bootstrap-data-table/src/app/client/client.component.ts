import { SelectedItem } from '../data-table/selected-item';
import { PageChangeEvent } from '../data-table/page-change-event';
import { TableOptionsService } from '../data-table/data-table/table-options.service';
import { DataTableComponent } from '../data-table/data-table/data-table.component';
import { ColumnDefinition } from '../data-table/column-definition';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { TableOptions } from '../data-table/table-options';
import { TableConfig } from '../data-table/table-config';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as persons from './persons.json';

import 'rxjs/add/observable/of';
import { GithubClientService } from './github-client.service';
import { GithubRepository } from '../remote/github.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  title = 'app';
  public hasChanges = true;


  tableOptions: TableOptions = <TableOptions>{
    showLoader: false,
    loading: false,
    config: <TableConfig>{
      clientPaging: true,
      pageSize: 10,
      clientSort: true,
    }
  };

  constructor(private githubClientService: GithubClientService,
    private tableOptionsService: TableOptionsService) {
  }

  public ngOnInit(): void {
    this.tableOptionsService.updateOptions(this.tableOptions);
    const initialPageChangeEvent = <PageChangeEvent>{
      page: 1,
      size: 10
    };

    this.loadClientData();
  }

  fakeLoading() {
    const shadow = this;
    setTimeout(() => {
      shadow.githubClientService.getRepos()
        .subscribe(res => {
          shadow.tableOptions = <TableOptions>{
            records: res,
            showLoader: true,
            loading: false,
            config: <TableConfig>{
              clientPaging: true,
              pageSize: 10,
              clientSort: true,
              totalCount: res.length
            }
          };
          shadow.tableOptionsService.updateOptions(shadow.tableOptions);
        });
    }, 5000);
  }

  loadClientData() {
    this.githubClientService.getRepos()
      .subscribe(res => {
        this.tableOptions = <TableOptions>{
          records: res,
          showLoader: true,
          loading: false,
          config: <TableConfig>{
            clientPaging: true,
            pageSize: 10,
            clientSort: true,
            totalCount: res.length
          }
        };
        this.tableOptionsService.updateOptions(this.tableOptions);
      });
    this.githubClientService.getRepos()
    .subscribe(res => {
      const tableOptions = <TableOptions>{
        records: res,
        config: <TableConfig>{
          clientPaging: true,
          pageSize: 10,
          clientSort: true,
          totalCount: res.length
        }
      };
      this.tableOptionsService.updateOptions(tableOptions);
    });
  }

  canDeactivate() {
    console.log('Detecting changes. Has Changes: ' + this.hasChanges);
    return Observable.of(!this.hasChanges);
  }

  reload(event) {
    // console.log('Got Reload Event');
    // console.log(JSON.stringify(this.tableOptions));
  }

  selectedRows(selectedItems: SelectedItem[]){
    console.log(`Received Selected Items: ${selectedItems.length}`);
  }

}
