import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private http = inject(HttpClient);

  getTodosX() {
    return this.http.get<Todo[]>('http://localhost:3000/api/todos-x');
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>('http://localhost:3000/api/todos-x', todo);
  }

  deleteTodo(id: string) {
    return this.http.delete<void>(`http://localhost:3000/api/todos-x/${id}`);
  }

  toggleTodo(id: string, completed: boolean) {
    return this.http.patch<void>(`http://localhost:3000/api/todos-x/${id}`, { completed });
  }
}
