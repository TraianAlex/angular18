import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, validateStandardSchema } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import * as z from 'zod';
import { DemoFieldErrors } from './field-errors';

const FlightSchema = z.object({
  from: z.string().min(3).max(20),
  to: z.string().min(3).max(20),
  date: z.string().min(1, 'Date is required'),
});

const StrictFlightSchema = z.object({
  from: z.string().min(5).max(20),
  to: z.string().min(5).max(20),
  date: z.string().min(1, 'Date is required'),
});

/**
 * Zod via `validateStandardSchema`, including a reactive (dynamic) schema.
 */
@Component({
  selector: 'app-standard-schema-demo',
  imports: [FormField, FormRoot, JsonPipe, DemoFieldErrors],
  template: `
    <form [formRoot]="flightForm" class="mt-3 space-y-3">
      <div class="flex items-center gap-2">
        <input
          id="zod-strict"
          type="checkbox"
          [checked]="strict()"
          (change)="onStrictChange($event)"
        />
        <label class="text-sm font-medium text-gray-700" for="zod-strict">
          Strict mode (from/to min length 5)
        </label>
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="zod-from">From</label>
        <input
          id="zod-from"
          type="text"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="flightForm.from"
        />
        <app-demo-field-errors [field]="flightForm.from()" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="zod-to">To</label>
        <input
          id="zod-to"
          type="text"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="flightForm.to"
        />
        <app-demo-field-errors [field]="flightForm.to()" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="zod-date">Date</label>
        <input
          id="zod-date"
          type="date"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="flightForm.date"
        />
        <app-demo-field-errors [field]="flightForm.date()" />
      </div>
      <button type="submit" class="rounded-md bg-blue-500 px-3 py-2 text-white">Validate</button>
    </form>
    <pre class="mt-3 overflow-auto rounded bg-slate-50 p-2 text-xs text-slate-700">{{
      flightForm().value() | json
    }}</pre>
  `,
})
export class StandardSchemaDemo {
  readonly strict = signal(false);
  private readonly model = signal({ from: '', to: '', date: '' });

  onStrictChange(event: Event): void {
    this.strict.set((event.target as HTMLInputElement).checked);
  }

  readonly flightForm = form(
    this.model,
    (path) => {
      validateStandardSchema(path, () => (this.strict() ? StrictFlightSchema : FlightSchema));
    },
    {
      submission: {
        action: async () => undefined,
      },
    },
  );
}
