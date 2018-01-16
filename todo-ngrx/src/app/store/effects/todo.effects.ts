import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import * as TodoActions from '../actions/todo.action';
import { TodoState } from '../todo.state';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TodoEffects {

  @Effect()
  GetTodos$: Observable<Action> = this.actions$.
    ofType<TodoActions.GetTodos>(TodoActions.GET_TODOS)
    .mergeMap(action =>
      this.http.get(environment.client.base_url + '/todos')
        .map((data: Response) => {

          console.log(data);
          return new TodoActions.GetTodosSuccess(data['data']['docs'] as TodoState[]);
        })
        .catch(() => of(new TodoActions.GetTodoError()))
    );

  constructor( private http: HttpClient,
    private actions$: Actions) {

  }
}
