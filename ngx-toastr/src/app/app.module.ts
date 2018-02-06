import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard.component';
import { HttpClientModule } from '@angular/common/http';

import { SERVICES } from './services';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
      ToastrModule.forRoot(), // ToastrModule added
    RouterModule.forRoot([
      {
        path: '', component: DashboardComponent
      }
    ])
  ],
  providers: [...SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule { }
