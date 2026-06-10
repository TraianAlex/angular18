import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

@Service()
export class TodosService {
  private http = inject(HttpClient);

  getTodosX() {
    return httpResource<Todo[]>(() => `${environment.apiUrl}/todos-x`);
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>(`${environment.apiUrl}/todos-x`, todo);
  }

  deleteTodo(id: string) {
    return this.http.delete<void>(`${environment.apiUrl}/todos-x/${id}`);
  }

  toggleTodo(id: string, completed: boolean) {
    return this.http.patch<void>(`${environment.apiUrl}/todos-x/${id}`, { completed });
  }
}
