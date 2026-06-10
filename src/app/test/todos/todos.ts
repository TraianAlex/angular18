import { JsonPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { Todo, TodosService } from './todos.service';
import { toSignal } from '@angular/core/rxjs-interop';

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
  todosService = inject(TodosService);
  // todos = toSignal(this.todosService.getTodosX(), { requireSync: false });
  todos = this.todosService.getTodosX();
  completedCount = computed(() => this.todos.value()?.filter((todo) => todo.completed).length ?? 0);

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
          // this.todos.update((todos) => [...todos, todo]);
          this.todosService.addTodo(todo).subscribe((todo) => {
            this.todos.reload();
            f().reset({ ...INITIAL_TODO });
          });
        },
      },
    },
  );

  toggleTodo(id: string) {
    // this.todos.update((todos) =>
    //   todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    // );
    const todo = this.todos.value()?.find((t) => t.id === id);
    this.todosService.toggleTodo(id, !(todo?.completed ?? false)).subscribe(() => {
      this.todos.reload();
    });
  }

  deleteTodo(id: string) {
    // this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
    this.todosService.deleteTodo(id).subscribe(() => {
      this.todos.reload();
    });
  }
}
