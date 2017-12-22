import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service


import { AppComponent } from './app.component';

import { FuzzySearchService } from './fuzzy-search.service';
import { PersonService } from "./person.service";
import { FuseSearchService } from "./fuse-search.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [
    FuzzySearchService,
    PersonService,
    FuseSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
