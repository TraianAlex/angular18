import { Component, signal } from '@angular/core';
import {
  debounce,
  form,
  FormField,
  FormRoot,
  required,
  validateHttp,
} from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { DemoFieldErrors } from './field-errors';

interface LoginRecord {
  id: number;
  email: string;
}

/**
 * `validateHttp` (debounced request) and field-level `debounce()`.
 * Try username `test@test.com` against the local json-server login collection.
 */
@Component({
  selector: 'app-async-demo',
  imports: [FormField, FormRoot, JsonPipe, DemoFieldErrors],
  template: `
    <form [formRoot]="asyncForm" class="mt-3 space-y-3">
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="async-username">
          Username (async uniqueness)
        </label>
        <input
          id="async-username"
          type="text"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="asyncForm.username"
        />
        <app-demo-field-errors [field]="asyncForm.username()" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="async-query">
          Search query (model updates 300ms after typing)
        </label>
        <input
          id="async-query"
          type="search"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="asyncForm.query"
        />
      </div>
      <button
        type="submit"
        class="rounded-md bg-blue-500 px-3 py-2 text-white disabled:bg-gray-400"
        [disabled]="asyncForm().submitting()"
      >
        {{ asyncForm().submitting() ? 'Sending…' : 'Submit' }}
      </button>
    </form>
    <pre class="mt-3 overflow-auto rounded bg-slate-50 p-2 text-xs text-slate-700">{{
      asyncForm().value() | json
    }}</pre>
  `,
})
export class AsyncDemo {
  private readonly model = signal({ username: '', query: '' });

  readonly asyncForm = form(
    this.model,
    (f) => {
      required(f.username, { message: 'Username is required' });
      validateHttp(f.username, {
        debounce: 300,
        request: ({ value }) => {
          const username = value()?.trim();
          return username
            ? `${environment.apiUrl}/login?email=${encodeURIComponent(username)}`
            : undefined;
        },
        onSuccess: (result: LoginRecord[]) =>
          result.length > 0 ? { kind: 'taken', message: 'Name taken' } : undefined,
        onError: () => ({ kind: 'server-error', message: 'Error checking availability' }),
      });
      debounce(f.query, 300);
    },
    {
      submission: {
        ignoreValidators: 'none',
        action: async () => undefined,
      },
    },
  );
}
