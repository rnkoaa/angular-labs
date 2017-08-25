import { ModuleWithProviders } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import { HomeComponent } from "./home/home.component"
import { AboutComponent } from "./about/about.component"
import { ContactComponent } from "./contact/contact.component"
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component"

export const router: Routes = [
//  { path: "",redirectTo: 'home', pathMatch: 'full' },
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "**", component: PageNotFoundComponent },
];

export const appRoutingProviders: any[] = [
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
