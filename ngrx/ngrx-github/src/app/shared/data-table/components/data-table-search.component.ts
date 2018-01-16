import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { DataTableSearchService } from '../services/data-table-search.service';
@Component({
  selector: 'dt-search',
  template: `
  <div class="form-group row">
    <label for="colFormLabelSm" class="col-auto col-form-label col-form-label-md">Filter:</label>
    <div class="input-group col-md-7">
      <div class="input-group-addon">
        <i class="fa fa-search"></i>
      </div>
      <input (keyup)="searchTerm$.next($event.target.value)"
        type="text" class="form-control form-control-md"
        id="colFormLabelSm" placeholder="col-form-label-sm">
    </div>
  </div>`,
  styles: [
    `.col-form-label {

    }`
  ]
})
export class DataTableSearchComponent implements OnInit {

  searchTerm$ = new Subject<string>();

  constructor(private datatableSearchService: DataTableSearchService) {
    this.datatableSearchService.searchTerm$ = this.searchTerm$;
  }

  ngOnInit(): void {

  }

}
