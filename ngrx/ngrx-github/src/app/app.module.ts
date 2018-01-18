import { DashboardComponent } from './server-side/components/dashboard.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GithubService } from './services/github.service';
import { HttpClientModule } from '@angular/common/http';
import { ServerSideModule } from './server-side/server-side.module';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';

// import { reducers } from './store';

// import { StoreModule } from '@ngrx/store';

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? []
  : [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([{ path: '', component: DashboardComponent }]),
    ServerSideModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
