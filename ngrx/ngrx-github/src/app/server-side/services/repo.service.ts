import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import * as fromModels from '../../models';

// import { do } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

import 'rxjs/add/observable/empty';
// import 'rxjs/add/operator/do';

import { Observable } from 'rxjs/Observable';
@Injectable()
export class RepoService {
  REPO_BASE = '/repos';

  constructor(private http: HttpClient) {}

  getRepos(httpParams: HttpParams): Observable<fromModels.GithubResponse> {
    return this.http.get<fromModels.GithubResponse>(this.REPO_BASE, {
      params: httpParams
    });
  }

  getAllRepos(): Observable<fromModels.GithubResponse> {
    return this.http.get<fromModels.GithubResponse>(this.REPO_BASE, {
      params: new HttpParams().set('page', '1').set('size', '10')
    });
  }
}
