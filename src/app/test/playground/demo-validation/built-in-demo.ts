import { Component, signal } from '@angular/core';
import {
  email,
  form,
  FormField,
  FormRoot,
  max,
  min,
  minLength,
  required,
} from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { DemoFieldErrors } from './field-errors';

/**
 * Built-in validators, `when` predicates, and replacing an error object.
 */
@Component({
  selector: 'app-built-in-demo',
  imports: [FormField, FormRoot, JsonPipe, DemoFieldErrors],
  template: `
    <form [formRoot]="loginForm" class="mt-3 space-y-3">
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="built-in-email"
          >Email</label
        >
        <input
          id="built-in-email"
          type="email"
          autocomplete="email"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="loginForm.email"
        />
        <app-demo-field-errors [field]="loginForm.email()" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="built-in-password"
          >Password</label
        >
        <input
          id="built-in-password"
          type="password"
          autocomplete="new-password"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="loginForm.password"
        />
        <app-demo-field-errors [field]="loginForm.password()" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="built-in-age"
          >Age (min/max)</label
        >
        <input
          id="built-in-age"
          type="number"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="loginForm.age"
        />
        <app-demo-field-errors [field]="loginForm.age()" />
      </div>
      <div class="flex items-center gap-2">
        <input id="built-in-delayed" type="checkbox" [formField]="loginForm.delayed" />
        <label class="text-sm font-medium text-gray-700" for="built-in-delayed"
          >Shipment delayed</label
        >
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="built-in-reason">
          Delay reason (required only when delayed)
        </label>
        <input
          id="built-in-reason"
          type="text"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="loginForm.delayReason"
        />
        <app-demo-field-errors [field]="loginForm.delayReason()" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="built-in-nickname">
          Nickname (custom error object)
        </label>
        <input
          id="built-in-nickname"
          type="text"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="loginForm.nickname"
        />
        <app-demo-field-errors [field]="loginForm.nickname()" />
      </div>
      <button type="submit" class="rounded-md bg-blue-500 px-3 py-2 text-white">Validate</button>
    </form>
    <pre class="mt-3 overflow-auto rounded bg-slate-50 p-2 text-xs text-slate-700">{{
      loginForm().value() | json
    }}</pre>
  `,
})
export class BuiltInDemo {
  private readonly loginModel = signal({
    email: '',
    password: '',
    age: 18,
    delayed: false,
    delayReason: '',
    nickname: '',
  });

  readonly loginForm = form(
    this.loginModel,
    (login) => {
      required(login.email, { message: 'Email is required' });
      email(login.email, { message: 'Enter a valid email' });
      required(login.password, { message: 'Password is required' });
      minLength(login.password, 8, { message: 'At least 8 characters' });
      min(login.age, 18, { message: 'Must be at least 18' });
      max(login.age, 120, { message: 'Must be 120 or under' });
      required(login.delayReason, {
        message: 'Delay reason is required',
        when: (ctx) => ctx.valueOf(login.delayed),
      });
      required(login.nickname, {
        error: { kind: 'server', message: 'This nickname is already registered' },
      });
    },
    {
      submission: {
        action: async () => undefined,
      },
    },
  );
}
