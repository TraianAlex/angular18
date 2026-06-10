import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { Todo } from './todos.service';

const INITIAL_TODO: Todo = {
  id: crypto.randomUUID(),
  title: '',
  completed: false,
};

@Component({
  selector: 'app-todos-x',
  templateUrl: './todos.html',
  imports: [FormField, FormRoot, JsonPipe],
})
export class TodosXComponent {
  todos = signal<Todo[]>([
    { id: crypto.randomUUID(), title: 'Todo 1', completed: false },
    { id: crypto.randomUUID(), title: 'Todo 2', completed: false },
    { id: crypto.randomUUID(), title: 'Todo 3', completed: false },
  ]);

  todosModel = signal<Todo>({ ...INITIAL_TODO });

  todosForm = form(
    this.todosModel,
    (f) => {
      required(f.title, { message: 'Title is required' });
    },
    {
      submission: {
        action: async (f) => {
          const todo = { ...this.todosModel(), id: crypto.randomUUID() };
          this.todos.update((todos) => [...todos, todo]);
          f().reset({ ...INITIAL_TODO });
        },
      },
    },
  );

  toggleTodo(id: string) {
    this.todos.update((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  }

  deleteTodo(id: string) {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }
}
