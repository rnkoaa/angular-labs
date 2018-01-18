import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import * as TodoActions from '../store/actions/todo.actions';
import { Todo } from '../models';

import * as fromTodos from '../store/reducers';
// import {
//   ADD_TODO,
//   DELETE_TODO,
//   UPDATE_TODO,
//   TOGGLE_DONE
// } from '../store/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  todos$: any;
  todo: string;
  editing = false;
  idToEdit: string | null;

  constructor(private store: Store<fromTodos.TodoState>) {}

  generateUUID() {
    return UUID.UUID();
  }

  ngOnInit() {
    this.todos$ = this.store.select(fromTodos.selectAll);
  }

  addTodo(value) {
    const todo: Todo = {
      value,
      done: false,
      id: this.generateUUID()
    };
    this.store.dispatch(new TodoActions.AddTodo({ todo }));

    this.todo = '';
  }
  deleteTodo(id) {
    console.log(`Deleting todo: ${id}`);
    this.store.dispatch(new TodoActions.DeleteTodo({ id }));
  }

  editTodo(todo, index) {
    console.log(todo);
    this.editing = true;
    this.todo = todo.value;
    this.idToEdit = todo.id;
  }

  cancelEdit() {
    this.editing = false;
    this.todo = '';
    this.idToEdit = null;
  }

  updateTodo(updatedTodo) {
    this.store.dispatch(
      new TodoActions.UpdateTodo({
        id: this.idToEdit,
        newValue: updatedTodo
      })
    );
    this.todo = '';
    this.idToEdit = null;
    this.editing = false;
  }

  toggleDone(todo, index) {
    this.store.dispatch(
      new TodoActions.ToggleDone({ id: todo.id, done: !todo.done })
    );
  }
}
