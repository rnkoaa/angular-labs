import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/do';

import * as fromModels from '../models';
// import { GithubRepository } from '../models/githubRepository.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GithubService {
  CLIENT_DATA_ENDPOINT = 'assets/json/kbastani.github.full.json';
  constructor(private http: HttpClient) {

  }

  getRepos(): Observable<fromModels.GithubRepository[]> {
    return this.http.get<fromModels.GithubRepository[]>(this.CLIENT_DATA_ENDPOINT);
  }
}
