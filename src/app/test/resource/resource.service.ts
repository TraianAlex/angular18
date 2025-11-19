import { inject, Injectable } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';

import { Todo } from '../../shared/models/todos.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private http = inject(HttpClient);

  getTodos(apiUrlFn: () => string) {
    return httpResource<Todo[]>(apiUrlFn);
  }

  addTodo(todo: Todo) {
    return this.http.post<any>(environment.apiTodosUrl, todo);
  }

  deleteTodo(id: number) {
    return this.http.delete<any>(`${environment.apiTodosUrl}/${id}`);
  }

  toggleTodo(id: number) {
    return this.http.put<any>(`${environment.apiTodosUrl}/${id}`, { completed: true });
  }
}
