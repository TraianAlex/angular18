import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http';

import { routes } from './app.routes';
import { mockingInterceptor } from './shared/utils/data';
import { provideSignalFormsConfig } from '@angular/forms/signals';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withXhr(), withInterceptors([mockingInterceptor])),
    provideBrowserGlobalErrorListeners(),
    // automatically add the classes to the form fields
    provideSignalFormsConfig({
      classes: {
        'ng-invalid': (field) => field.state().invalid(),
        'ng-valid': (field) => field.state().valid() && field.state().required(),
        'ng-dirty': (field) => field.state().dirty(),
      },
    }),
  ],
};
