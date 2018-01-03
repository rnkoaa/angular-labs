import { GithubRepository } from '../remote/github.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/do';

@Injectable()
export class GithubClientService {

  CLIENT_DATA_ENDPOINT = 'assets/json/kbastani.github.full.json';
  constructor(private http: HttpClient) {

  }

  getRepos(): Observable<GithubRepository[]> {
    return this.http.get<GithubRepository[]>(this.CLIENT_DATA_ENDPOINT);
  }
}
