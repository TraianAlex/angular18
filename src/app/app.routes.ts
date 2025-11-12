import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./test/test.component').then((m) => m.TestComponent),
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: 'signals',
        loadComponent: () => import('./test/signals/signals.component').then((m) => m.SignalsComponent),
      },
      {
        path: 'signals1',
        loadComponent: () => import('./test/signals1/signals1.component').then((m) => m.Signals1Component),
      },
      {
        path: 'signals2',
        loadComponent: () => import('./test/signals2/signals2.component').then((m) => m.Signals2Component),
      },
    ],
  },
  {
    path: 'todos',
    loadComponent: () => import('./todos/todos.component').then((m) => m.TodosComponent),
  },
  // {
  //   path: 'reactive',
  //   component: ReactiveComponent,
  //   loadChildren: () => import('./reactive/routes').then((mod) => mod.REACTIVE_ROUTES),
  // },
  // {
  //   path: 'rxjs-basic',
  //   component: RxjsBasicComponent,
  //   loadChildren: () => import('./rxjs-basic/routes').then((mod) => mod.RXJS_BASIC),
  // },
  {
    path: '**',
    redirectTo: '',
  },
];
