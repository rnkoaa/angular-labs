import { TableOptionsService } from './data-table/data-table/table-options.service';
import { GithubService } from './remote/github.service';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { DataTableModule } from './data-table/data-table.module';
import { RemoteComponent } from './remote/remote.component';
import { ClientComponent } from './client/client.component';
import { GithubClientService } from './client/github-client.service';

export const ROUTES: Routes = [
  { path: '', component: ClientComponent },
  { path: 'remote', component: RemoteComponent },
  { path: 'client', component: ClientComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RemoteComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    NgbModule.forRoot(),
    DataTableModule,
  ],
  providers: [
    GithubService,
    TableOptionsService,
    GithubClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
