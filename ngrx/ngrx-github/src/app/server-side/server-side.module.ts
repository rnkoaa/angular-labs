import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard.component';
import { MODULE_SERVICES } from './services';
import { RouterModule, Routes } from '@angular/router';
import { SERVER_SIDE_ROUTES } from './server-side.routing';
import { DataTableModule } from '../shared/data-table/data-table.module';

import * as fromComponents from './components';

import { StoreModule } from '@ngrx/store';

import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    RouterModule.forChild(SERVER_SIDE_ROUTES),
    StoreModule.forFeature('repomodules', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [...MODULE_SERVICES],
  declarations: [...fromComponents.components]
})
export class ServerSideModule {}
