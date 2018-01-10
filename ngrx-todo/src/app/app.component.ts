import { Post } from './models/post';
import * as PostActions from './actions/post.actions';

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  message$: Observable<string>;
  post$: Observable<Post>;

  text: string;

  constructor(private store: Store<AppState>) {
    this.message$ = this.store.select('message');
    this.post$ = this.store.select('post');
  }

  editText() {
    this.store.dispatch(new PostActions.EditText(this.text));
  }

  resetPost() {
    this.store.dispatch(new PostActions.Reset());
  }
  upVote() {
    this.store.dispatch(new PostActions.UpVote());
  }
  downVote() {
    this.store.dispatch(new PostActions.DownVote());
  }

  spanish() {
    this.store.dispatch({ type: 'SPANISH' });
  }

  french() {
    this.store.dispatch({ type: 'FRENCH' });
  }
  reset() {
    this.store.dispatch({ type: 'RESET' });
  }
}
