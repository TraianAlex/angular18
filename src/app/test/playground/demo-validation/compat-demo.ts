import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { email, FormField, required } from '@angular/forms/signals';
import { compatForm, SignalFormControl } from '@angular/forms/signals/compat';
import { JsonPipe } from '@angular/common';
import { DemoFieldErrors } from './field-errors';

/**
 * Migration bridges: `compatForm` (top-down) and `SignalFormControl` (bottom-up).
 */
@Component({
  selector: 'app-compat-demo',
  imports: [FormField, ReactiveFormsModule, JsonPipe, DemoFieldErrors],
  template: `
    <div class="mt-3 space-y-6">
      <section>
        <h4 class="mb-2 text-sm font-semibold text-gray-800">compatForm + existing FormControl</h4>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="compat-name">Name</label>
        <input
          id="compat-name"
          type="text"
          class="mb-2 w-full rounded-md border border-gray-300 p-2"
          [formField]="compatSignalForm.name"
        />
        <label class="mb-1 block text-sm font-medium text-gray-700" for="compat-age"
          >Age (min 3, FormControl)</label
        >
        <input
          id="compat-age"
          type="number"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="compatSignalForm.age"
        />
        <app-demo-field-errors [field]="compatSignalForm.age()" />
        <pre class="mt-3 overflow-auto rounded bg-slate-50 p-2 text-xs text-slate-700">
name: {{ compatSignalForm.name().value() | json }}
age: {{ compatSignalForm.age().value() | json }}
assembled: {{ assembledValue() | json }}
        </pre
        >
      </section>

      <section>
        <h4 class="mb-2 text-sm font-semibold text-gray-800">
          SignalFormControl inside a FormGroup
        </h4>
        <form [formGroup]="userForm" class="space-y-3">
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700" for="legacy-first"
              >First name</label
            >
            <input
              id="legacy-first"
              type="text"
              formControlName="firstName"
              class="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700" for="legacy-email"
              >Email</label
            >
            <input
              id="legacy-email"
              type="email"
              class="w-full rounded-md border border-gray-300 p-2"
              [formField]="emailControl.fieldTree"
            />
            <app-demo-field-errors [field]="emailControl.fieldTree()" />
          </div>
        </form>
      </section>
    </div>
  `,
})
export class CompatDemo {
  private readonly fb = inject(FormBuilder);
  private readonly ageControl = new FormControl(5, {
    nonNullable: true,
    validators: Validators.min(3),
  });
  private readonly compatModel = signal({
    name: 'Jan',
    age: this.ageControl,
  });

  readonly compatSignalForm = compatForm(this.compatModel);
  readonly assembledValue = computed(() => ({
    name: this.compatSignalForm.name().value(),
    age: this.compatSignalForm.age().value(),
  }));

  readonly emailControl = new SignalFormControl<string>('', (path) => {
    required(path, { message: 'Email is required' });
    email(path, { message: 'Provide a valid email address' });
  });

  readonly userForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    email: this.emailControl,
  });
}
