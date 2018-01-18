import { CrocsComponent, GatorsComponent } from './components';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    data: { title: 'Welcome This is ngrx/router-store sample' }
  },
  {
    path: 'gators',
    component: GatorsComponent,
    data: { title: 'Alligators' }
  },
  {
    path: 'crocs',
    component: CrocsComponent,
    data: { title: 'Crocodiles' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
