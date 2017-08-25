import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PokemonService } from './shared/services/pokemon.service';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonEntryComponent } from './pokemon-list/pokemon-entry/pokemon-entry.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { PokemonInfoComponent } from './pokemon-info/pokemon-info.component';
import { NavbarComponent } from './shared/navbar/navbar.component';


import {routes, appRoutingProviders} from './app.routing';
import { LoaderComponent } from './shared/loader/loader.component';
import { PagerComponent } from './shared/pager/pager.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonEntryComponent,
    PaginationComponent,
    PokemonInfoComponent,
    NavbarComponent,
    LoaderComponent,
    PagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [PokemonService, appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
