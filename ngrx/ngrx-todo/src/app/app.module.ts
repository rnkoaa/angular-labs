import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// import { DashboardComponent } from './components/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoModule } from './todo/todo.module';
import { DashboardComponent } from './todo/components/dashboard.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TodoModule,
    StoreModule.forRoot({ }),
    RouterModule.forRoot([
      {
        path: '',
        component: DashboardComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
