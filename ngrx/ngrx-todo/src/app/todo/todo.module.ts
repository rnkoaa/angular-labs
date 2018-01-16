import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './store/reducers/todo.reducer';
import { DashboardComponent } from './components/dashboard.component';
@NgModule({
  imports: [CommonModule,
    FormsModule,
     StoreModule.forFeature('todo', todoReducer)],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class TodoModule {}
