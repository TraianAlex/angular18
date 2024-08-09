import { Routes } from '@angular/router';

import { TestComponent } from './test/test.component';
import { SignalsComponent } from './signals/signals.component';
import { Signals1Component } from './signals1/signals1.component';

export const routes: Routes = [
  {
    path: '',
    component: TestComponent,
  },
  {
    path: 'test',
    component: SignalsComponent,
    children: [
      { path: 'signals1', component: Signals1Component },
      // { path: 'todos-basic', component: TodosBasicComponent },
      // { path: 'todos-reactive', component: TodosComponent2 },
      // { path: 'selectors', component: TestStoreComponent },
    ],
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
