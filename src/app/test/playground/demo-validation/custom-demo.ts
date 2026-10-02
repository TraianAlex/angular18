import { Component, signal } from '@angular/core';
import {
  form,
  FormField,
  FormRoot,
  required,
  validate,
  validateTree,
} from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { DemoFieldErrors } from './field-errors';

/**
 * Custom `validate`, cross-field password match, and `validateTree`.
 */
@Component({
  selector: 'app-custom-demo',
  imports: [FormField, FormRoot, JsonPipe, DemoFieldErrors],
  template: `
    <form [formRoot]="registrationForm" class="mt-3 space-y-3">
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="custom-username"
          >Username</label
        >
        <input
          id="custom-username"
          type="text"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="registrationForm.username"
        />
        <app-demo-field-errors [field]="registrationForm.username()" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="custom-password"
          >Password</label
        >
        <input
          id="custom-password"
          type="password"
          autocomplete="new-password"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="registrationForm.password"
        />
        <app-demo-field-errors [field]="registrationForm.password()" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="custom-confirm"
          >Confirm password</label
        >
        <input
          id="custom-confirm"
          type="password"
          autocomplete="new-password"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="registrationForm.confirmPassword"
        />
        <app-demo-field-errors [field]="registrationForm.confirmPassword()" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="custom-first"
          >First name</label
        >
        <input
          id="custom-first"
          type="text"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="registrationForm.firstName"
        />
        <app-demo-field-errors [field]="registrationForm.firstName()" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="custom-last">
          Last name (receives validateTree error)
        </label>
        <input
          id="custom-last"
          type="text"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="registrationForm.lastName"
        />
        <app-demo-field-errors [field]="registrationForm.lastName()" />
      </div>
      <button type="submit" class="rounded-md bg-blue-500 px-3 py-2 text-white">Validate</button>
    </form>
    <pre class="mt-3 overflow-auto rounded bg-slate-50 p-2 text-xs text-slate-700">{{
      registrationForm().value() | json
    }}</pre>
  `,
})
export class CustomDemo {
  private readonly model = signal({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  readonly registrationForm = form(
    this.model,
    (f) => {
      required(f.username, { message: 'Username is required' });
      validate(f.username, ({ value }) => {
        if (value().includes(' ')) {
          return { kind: 'no-spaces', message: 'Name cannot contain spaces' };
        }
        return undefined;
      });

      required(f.password, { message: 'Password is required' });
      required(f.confirmPassword, { message: 'Confirm your password' });
      validate(f.confirmPassword, ({ value, valueOf }) => {
        if (value() !== valueOf(f.password)) {
          return { kind: 'password-mismatch', message: 'Passwords are not identical' };
        }
        return undefined;
      });

      validateTree(f, (ctx) => {
        if (ctx.valueOf(f.firstName).length > 0 && ctx.valueOf(f.firstName).length < 5) {
          return {
            kind: 'minLength5',
            message: 'First name must be at least 5 characters',
            fieldTree: ctx.fieldTree.lastName,
          };
        }
        return null;
      });
    },
    {
      submission: {
        action: async () => undefined,
      },
    },
  );
}
