import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  todos = signal<Todo[]>([
    { id: 1, title: 'Learn Angular Signals', completed: false },
    { id: 2, title: 'Build a Todo App', completed: false },
    { id: 3, title: 'Master Reactive Programming', completed: true },
  ]);

  newTodoTitle = signal<string>('');

  addTodo() {
    const title = this.newTodoTitle().trim();
    if (title) {
      const newTodo: Todo = {
        id: Date.now(),
        title,
        completed: false,
      };
      this.todos.update((todos) => [...todos, newTodo]);
      this.newTodoTitle.set('');
    }
  }

  toggleTodo(id: number) {
    this.todos.update((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  }

  deleteTodo(id: number) {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  completedCount() {
    return this.todos().filter((todo) => todo.completed).length;
  }

  totalCount() {
    return this.todos().length;
  }
}
