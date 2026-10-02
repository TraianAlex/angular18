import { Component, input } from '@angular/core';

/** Minimal field-state shape used to print Signal Forms errors. */
export interface DemoFieldState {
  touched(): boolean;
  invalid(): boolean;
  pending(): boolean;
  errors(): readonly { kind: string; message?: string }[];
}

@Component({
  selector: 'app-demo-field-errors',
  template: `
    @if (field().pending()) {
      <p class="mt-1 text-sm text-slate-500">Checking…</p>
    }
    @if (field().touched() && field().invalid()) {
      <div class="mt-1 space-y-1" role="alert">
        @for (error of field().errors(); track error.kind) {
          <p class="text-sm text-red-600">{{ error.message ?? error.kind }}</p>
        }
      </div>
    }
  `,
})
export class DemoFieldErrors {
  readonly field = input.required<DemoFieldState>();
}
