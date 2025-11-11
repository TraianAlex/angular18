import { Routes } from '@angular/router';

import { TestComponent } from './test/test.component';
import { SignalsComponent } from './signals/signals.component';
import { Signals1Component } from './signals1/signals1.component';
import { Signals2Component } from './signals2/signals2.component';

export const routes: Routes = [
  {
    path: '',
    component: TestComponent,
  },
  {
    path: 'test',
    component: SignalsComponent,
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
    component: Signals1Component,
  },
  {
    path: 'signals2',
    component: Signals2Component,
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
