import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Title } from '@angular/platform-browser';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import 'rxjs/add/operator/do';
import { RouterStateTitle } from '../../shared/utils';

@Injectable()
export class TitleUpdaterEffects {
  @Effect({ dispatch: false })
  updateTitle$ = this.actions
    .ofType(ROUTER_NAVIGATION)
    .do((action: RouterNavigationAction<RouterStateTitle>) => {
      this.titleService.setTitle(action.payload.routerState.title);
    });

  constructor(private actions: Actions, private titleService: Title) {}
}
