import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GatorsComponent, CrocsComponent } from './components';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { reducers } from './store/reducers';
import { CustomRouterStateSerializer } from './shared/utils';

import { EffectsModule } from '@ngrx/effects';
import { TitleUpdaterEffects } from './store/effects';

@NgModule({
  declarations: [AppComponent, GatorsComponent, CrocsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TitleUpdaterEffects]),
    StoreRouterConnectingModule
  ],
  providers: [
    /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot, the title.
     */
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
