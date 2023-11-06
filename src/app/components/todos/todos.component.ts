import { Component, OnInit } from '@angular/core';
import { Todo } from './../../models/Todo';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  input: string = '';

  ngOnInit(): void {
    const savedTodos = localStorage.getItem('angular-todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }

  addTodo(): void {
    if (!this.input) return;
    this.todos.push({
      id: crypto.randomUUID(),
      name: this.input,
      completed: false
    });
    this.input = '';
    this.saveTodos();
  }

  removeTodo(id: string): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }

  saveTodos() {
    localStorage.setItem('angular-todos', JSON.stringify(this.todos));
  }

  toggleCompleted(id: string): void {
    this.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
  }
}
