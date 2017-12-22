import { Component, OnInit } from '@angular/core';
import { SEARCH_TEMPLATE } from './items-per-page.template';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/switchMap'
import { DataTableSearchService } from './data-table-search.service';
@Component({
  selector: 'app-data-table-search',
  template: SEARCH_TEMPLATE,
  styles: [
    `.col-form-label {
      /* line-height: .75 !important; */
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
