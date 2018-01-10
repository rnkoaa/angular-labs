import { todos } from './store/todos.reducer';
import { TodoService } from './services/todo.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodosComponent } from './components/todos/todos.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodosComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.provideStore({todos}),
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
