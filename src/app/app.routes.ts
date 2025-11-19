import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./test/test.component').then((m) => m.TestComponent),
    children: [
      { path: '', redirectTo: 'signals', pathMatch: 'full' },
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
      {
        path: 'resource',
        loadComponent: () => import('./test/resource/resource.component').then((m) => m.ResourceComponent),
      },
    ],
  },
  {
    path: 'todos',
    loadComponent: () => import('./todos/todos.component').then((m) => m.TodosComponent),
  },
  {
    path: 'star-rating',
    loadComponent: () =>
      import('./star-rating/star-rating-container.component').then((m) => m.StarRatingContainerComponent),
    children: [
      {
        path: '',
        redirectTo: 'star-rating',
        pathMatch: 'full',
      },
      {
        path: 'star-rating',
        loadComponent: () => import('./star-rating/start-rating.component').then((m) => m.StarRatingComponent),
      },
      {
        path: 'star-rating2',
        loadComponent: () => import('./star-rating/star-rating2.component').then((m) => m.ReactionPickerComponent),
      },
      {
        path: 'feedback-form',
        loadComponent: () => import('./star-rating/feedback-form.component').then((m) => m.FeedbackFormComponent),
      },
      {
        path: 'toggle-switch',
        loadComponent: () => import('./star-rating/toggle-switch.component').then((m) => m.ToggleSwitchComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
