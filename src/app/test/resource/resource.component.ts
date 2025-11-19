import { httpResource } from '@angular/common/http';
import { Component, signal, computed, inject, DestroyRef } from '@angular/core';

import { Todo } from '../../shared/models/todos.model';
import { environment } from '../../../environments/environment';
import { ResourceService } from './resource.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  resetTodos() {
    this.todos.set([]);
  }

  addTodo() {
    const newTodo: Todo = {
      id: Date.now(),
      title: `New Todo ${Math.random().toString(36).substring(2, 15).toUpperCase()}`,
      completed: false,
    };
    const currentTodos = this.todos.value() ?? [];
    this.todos.update(() => [newTodo, ...currentTodos]);

    // Note: To actually persist the new todo, you need to make an HTTP POST
    // call to your backend. httpResource itself does not handle mutations.
    this.resourceService
      .addTodo(newTodo)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        console.log(response);
      });
  }

  deleteTodo(id: number) {
    this.resourceService
      .deleteTodo(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.todos.update((todos) => todos?.filter((todo) => todo.id !== id) ?? []);
      });
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
