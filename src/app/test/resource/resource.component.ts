import { Component, signal, computed, inject, effect, DestroyRef } from '@angular/core';
import { switchMap, filter } from 'rxjs';

import { Todo } from '../../shared/models/todos.model';
import { environment } from '../../../environments/environment';
import { ResourceService } from './resource.service';
import { toSignal, toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-resource',
  imports: [],
  templateUrl: './resource.component.html',
  styleUrl: './resource.component.scss',
})
export class ResourceComponent {
  resourceService = inject(ResourceService);
  destroyRef = inject(DestroyRef);

  searchQuery = signal('');
  newTodoTitle = signal('');
  addTodoTrigger = signal<Todo | null>(null);
  deleteTodoTrigger = signal<number | null>(null);

  // Build the API URL with json-server filtering
  // json-server supports title_like for partial string matching
  apiUrl = computed(() => {
    const query = this.searchQuery().trim();
    const baseUrl = environment.apiTodosUrl;
    if (query) {
      // Use title_like for case-insensitive partial matching
      return `${baseUrl}?title_like=${encodeURIComponent(query)}`;
    }
    return baseUrl;
  });

  todos = this.resourceService.getTodos(() => this.apiUrl());

  // Convert trigger signal to observable, then switchMap to HTTP call
  addTodoResult = toSignal(
    toObservable(this.addTodoTrigger).pipe(
      filter((todo): todo is Todo => todo !== null),
      switchMap((todo) => this.resourceService.addTodo(todo))
    ),
    { requireSync: false }
  );

  // Convert delete trigger signal to observable, then switchMap to HTTP call
  deleteTodoResult = toSignal(
    toObservable(this.deleteTodoTrigger).pipe(
      filter((id): id is number => id !== null),
      switchMap((id) => this.resourceService.deleteTodo(id))
    ),
    { requireSync: false }
  );

  // Effect to reload todos after successful addition
  constructor() {
    effect(() => {
      const result = this.addTodoResult();
      if (result) {
        // Reload todos after successful addition
        this.todos.reload();
        this.newTodoTitle.set('');
        this.addTodoTrigger.set(null);
      }
    });

    effect(() => {
      const result = this.deleteTodoResult();
      if (result) {
        // Reload todos after successful deletion
        this.todos.reload();
        this.deleteTodoTrigger.set(null);
      }
    });
  }

  resetTodos() {
    this.todos.set([]);
  }

  addTodo() {
    const title = this.newTodoTitle().trim();
    if (!title) return;

    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };
    // Trigger the add todo operation
    this.addTodoTrigger.set(newTodo);

    // Optimistically update the UI
    const currentTodos = this.todos.value() ?? [];
    this.todos.update(() => [newTodo, ...currentTodos]);
  }

  deleteTodo(id: number) {
    // Optimistically update the UI
    this.todos.update((todos) => todos?.filter((todo) => todo.id !== id) ?? []);
    // Trigger the delete todo operation
    this.deleteTodoTrigger.set(id);
  }

  toggleTodo(id: number) {
    this.resourceService
      .toggleTodo(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.todos.update(
          (todos) => todos?.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)) ?? []
        );
      });
  }
}
