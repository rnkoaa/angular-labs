import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataTableSearchService {
  constructor() { }

  searchTerm$;
}
