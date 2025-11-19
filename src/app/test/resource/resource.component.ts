import { httpResource } from '@angular/common/http';
import { Component, signal, computed } from '@angular/core';

import { Todo } from '../../shared/models/todos.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-resource',
  imports: [],
  templateUrl: './resource.component.html',
  styleUrl: './resource.component.scss',
})
export class ResourceComponent {
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

  todos = httpResource<Todo[]>(() => this.apiUrl());

  resetTodos() {
    this.todos.set([]);
  }

  addTodo() {
    const newTodo: Todo = { id: Date.now(), title: 'New Todo', completed: false };
    const currentTodos = this.todos.value() ?? [];
    this.todos.update(() => [newTodo, ...currentTodos]);

    // Note: To actually persist the new todo, you need to make an HTTP POST
    // call to your backend. httpResource itself does not handle mutations.
  }
}
