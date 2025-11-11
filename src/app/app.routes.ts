import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./test/test.component').then((m) => m.TestComponent),
  },
  {
    path: 'test',
    loadComponent: () => import('./signals/signals.component').then((m) => m.SignalsComponent),
    children: [
      // { path: '', redirectTo: '', pathMatch: 'full' },
      // { path: 'signals1', component: Signals1Component },
      // { path: 'signals2', component: Signals2Component },
      // { path: 'todos-reactive', component: TodosComponent2 },
      // { path: 'selectors', component: TestStoreComponent },
    ],
  },
  {
    path: 'signals1',
    loadComponent: () => import('./signals1/signals1.component').then((m) => m.Signals1Component),
  },
  {
    path: 'signals2',
    loadComponent: () => import('./signals2/signals2.component').then((m) => m.Signals2Component),
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
