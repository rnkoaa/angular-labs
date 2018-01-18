import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// routes
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  {
    path: 'products',
    data: { title: 'Alligators' },
    loadChildren: '../products/products.module#ProductsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
