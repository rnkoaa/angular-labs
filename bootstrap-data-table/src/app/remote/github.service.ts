import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import { Observable } from 'rxjs/Observable';
import { PageChangeEvent, PageChangeType } from '../data-table/models/page-change-event';

@Injectable()
export class GithubService {
  constructor(private http: HttpClient) {

  }

  getRepositories(event: PageChangeEvent): Observable<GithubResponse> {
    let httpParams: HttpParams;
    switch (event.eventType) {
      case PageChangeType.PAGE_CHANGE:
        httpParams = new HttpParams()
          .set('page', `${event.page}`)
          .set('size', `${event.size}`);
        if (event.sortable) {
          if (event.sortBy) {
            httpParams = httpParams.set('sort', event.sortBy);
          }

          if (event.sortDirection) {
            httpParams = httpParams.set('direction', event.sortDirection);
          }
        }
        break;
      case PageChangeType.COLUMN_SORTED:
        httpParams = new HttpParams()
          .set('sort', event.sortBy)
          .set('direction', event.sortDirection);
        if (event.page) {
          httpParams = httpParams.set('page', `${event.page}`);
        }
        httpParams = httpParams.set('size', `${event.size}`);
        break;
      case PageChangeType.PAGE_SIZE:
        break;
      case PageChangeType.TABLE_RELOAD:
      default:
        httpParams = new HttpParams().set('page', `1`).set('size', `${event.size}`);
        break;
    }
    return this.http.get<GithubResponse>('/repos', { params: httpParams })
      ;
  }


  getRepos(event: PageChangeEvent): Observable<GithubResponse[]> {
    let httpParams: HttpParams;
    switch (event.eventType) {
      case PageChangeType.PAGE_CHANGE:
        httpParams = new HttpParams()
          .set('page', `${event.page}`)
          .set('size', `${event.size}`);
        if (event.sortable) {
          if (event.sortBy) {
            httpParams = httpParams.set('sort', event.sortBy);
          }

          if (event.sortDirection) {
            httpParams = httpParams.set('direction', event.sortDirection);
          }
        }
        break;
      case PageChangeType.COLUMN_SORTED:
        httpParams = new HttpParams()
          .set('sort', event.sortBy)
          .set('direction', event.sortDirection);
        if (event.page) {
          httpParams = httpParams.set('page', `${event.page}`);
        }
        httpParams = httpParams.set('size', `${event.size}`);
        break;
      case PageChangeType.PAGE_SIZE:
        break;
      case PageChangeType.TABLE_RELOAD:
      default:
        httpParams = new HttpParams().set('page', `1`).set('size', `${event.size}`);
        break;
    }
    return this.http.get<GithubRepository[]>('/repos', { params: httpParams })
      ;
  }
}

export interface GithubResponse {
  data?: GithubRepository[];
  direction?: string;
  next?: number;
  page?: number;
  size?: number;
  sort?: string;
  total?: number;
}

export class GithubRepository {
  id: number;
  name: string;
  full_name: string;
  owner: GithubRepoOwner;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  open_issues_count: number;
  forks: number;
  watchers: number;
  default_branch: string;
  mirror_url: string;
  license: string;
  archived: boolean;
}

export interface GithubRepoOwner {
  login: string;
  id: number;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}
