import { inject } from '@angular/core';
import { Step2Component } from './cars/step2/step2.component';
import { ProductSearchComponent } from './test/product-search/product-search';
import { Routes } from '@angular/router';
import { ConfiguratorService } from './cars/configurator.service';
import { Step3Component } from './cars/step3/step3.component';

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
        path: 'product-search',
        loadComponent: () => import('./test/product-search/product-search').then((m) => m.ProductSearchComponent),
      },
      {
        path: 'product-search2',
        loadComponent: () => import('./test/product-search2/product-search2').then((m) => m.ProductSearch2),
      },
      {
        path: 'resource',
        loadComponent: () => import('./test/resource/resource.component').then((m) => m.ResourceComponent),
      },
      {
        path: 'todos-x',
        loadComponent: () => import('./test/todos/todos').then((m) => m.TodosXComponent),
      },
      {
        path: 'directives',
        loadComponent: () => import('./test/directives/directives').then((m) => m.DirectivesComponent),
      },
      {
        path: 'playground',
        loadComponent: () => import('./test/playground/playground').then((m) => m.PlaygroundComponent),
      },
      {
        path: 'country-search',
        loadComponent: () => import('./country-search/country').then((m) => m.Country),
      },
      {
        path: 'nba',
        loadComponent: () => import('./nba-results/nba').then((m) => m.Nba),
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
      {
        path: 'date-range-picker',
        loadComponent: () => import('./star-rating/date-range-picker').then((m) => m.DateRangePicker),
      },
    ],
  },
  {
    path: 'movies',
    children: [
      {
        path: '',
        loadComponent: () => import('./movies/movies').then((m) => m.Movies),
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./movies/movie-details/movie-details').then((m) => m.MovieDetailsComponent),
      },
    ],
  },
  {
    path: 'cars',
    loadComponent: () => import('./cars/cars').then((m) => m.CarsComponent),
    children: [
      { path: '', redirectTo: 'step1', pathMatch: 'full' },
      { path: 'step1', loadComponent: () => import('./cars/step1/step1.component').then((m) => m.Step1Component) },
      { path: 'step2', component: Step2Component, canActivate: [() => inject(ConfiguratorService).step2Ready()] },
      { path: 'step3', component: Step3Component, canActivate: [() => inject(ConfiguratorService).step3Ready()] },
    ],
  },
  {
    path: 'jobs',
    loadComponent: () => import('./jobs/jobs').then((m) => m.JobsComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./jobs/pages/jobs/jobs.page').then((m) => m.JobsPage),
      },
      {
        path: 'favorites',
        loadComponent: () => import('./jobs/pages/favorites/favorites.page').then((m) => m.FavoritesPage),
      },
      {
        path: 'job/:jobId',
        loadComponent: () => import('./jobs/pages/job-details.page').then((m) => m.JobDetailsPage),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
