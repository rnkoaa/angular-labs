import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CurrencyEffects } from './store/effects';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard.component';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';

// import { EffectsModule } from '@ngrx/effects';
import { CurrencyService } from './services';
import { EffectsModule } from '@ngrx/effects';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([CurrencyEffects]),
    RouterModule.forRoot([
      {
        path: '', component: DashboardComponent
      }
    ]),
    StoreModule.forRoot(reducers, {metaReducers})
  ],
  providers: [CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
