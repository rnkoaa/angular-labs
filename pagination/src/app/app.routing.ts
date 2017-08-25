
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonInfoComponent } from './pokemon-info/pokemon-info.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

export const router: Routes = [
    //  { path: "",redirectTo: 'home', pathMatch: 'full' },
    //   { path: "**", component: PageNotFoundComponent },
    { path: 'pokemon/:id', component: PokemonInfoComponent },
    { path: '', component: PokemonListComponent }
];

export const appRoutingProviders: any[] = [
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
