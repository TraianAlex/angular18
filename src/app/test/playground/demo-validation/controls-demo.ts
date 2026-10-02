import { Component, input, model, output, signal } from '@angular/core';
import {
  FormCheckboxControl,
  FormField,
  FormRoot,
  FormValueControl,
  required,
  transformedValue,
  ValidationError,
  form,
} from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { DemoFieldErrors } from './field-errors';

@Component({
  selector: 'app-demo-text-input',
  template: `
    <div [class.has-error]="invalid()">
      <input
        class="w-full rounded-md border border-gray-300 p-2 disabled:bg-slate-100"
        [class.border-red-500]="invalid() && touched()"
        [value]="value()"
        [disabled]="disabled()"
        [attr.name]="name()"
        [attr.aria-invalid]="invalid()"
        (input)="onInput($event)"
        (blur)="touch.emit()"
      />
      @if (invalid() && touched()) {
        <div class="mt-1 space-y-1" role="alert">
          @for (error of errors(); track error.kind) {
            <span class="block text-sm text-red-600">{{ error.message }}</span>
          }
        </div>
      }
    </div>
  `,
})
export class DemoTextInput implements FormValueControl<string> {
  readonly value = model('');
  readonly disabled = input(false);
  readonly touched = input(false);
  readonly touch = output<void>();
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);
  readonly name = input('');

  onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }
}

@Component({
  selector: 'app-demo-checkbox',
  template: `
    <label class="inline-flex items-center gap-2 text-sm text-gray-700">
      <input type="checkbox" [checked]="checked()" (change)="onChange($event)" />
      <ng-content />
    </label>
  `,
})
export class DemoCheckbox implements FormCheckboxControl {
  readonly checked = model(false);

  onChange(event: Event): void {
    this.checked.set((event.target as HTMLInputElement).checked);
  }
}

@Component({
  selector: 'app-demo-money-input',
  template: `
    <input
      class="w-full rounded-md border border-gray-300 p-2"
      [class.border-red-500]="invalid() && touched()"
      [value]="rawValue()"
      [attr.aria-invalid]="invalid()"
      (input)="onInput($event)"
    />
  `,
})
export class DemoMoneyInput implements FormValueControl<number> {
  readonly value = model(0);
  readonly invalid = input(false);
  readonly touched = input(false);
  protected readonly rawValue = transformedValue(this.value, {
    format: (value: number) => value.toFixed(2),
    parse: (raw: string) => {
      const parsed = Number(raw.replace(',', '.'));
      if (Number.isNaN(parsed)) {
        return { error: { kind: 'parse', message: 'Enter a number' } };
      }
      return { value: parsed };
    },
  });

  onInput(event: Event): void {
    this.rawValue.set((event.target as HTMLInputElement).value);
  }
}

/**
 * Custom controls: `FormValueControl`, `FormCheckboxControl`, and `transformedValue` parse errors.
 */
@Component({
  selector: 'app-controls-demo',
  imports: [
    FormField,
    FormRoot,
    JsonPipe,
    DemoFieldErrors,
    DemoTextInput,
    DemoCheckbox,
    DemoMoneyInput,
  ],
  template: `
    <form [formRoot]="profileForm" class="mt-3 space-y-3">
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="ctrl-email"
          >Email (custom input)</label
        >
        <app-demo-text-input id="ctrl-email" [formField]="profileForm.email" />
      </div>
      <div>
        <app-demo-checkbox [formField]="profileForm.acceptTerms">Accept terms</app-demo-checkbox>
        <app-demo-field-errors [field]="profileForm.acceptTerms()" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="ctrl-amount"
          >Amount (parse to number)</label
        >
        <app-demo-money-input id="ctrl-amount" [formField]="profileForm.amount" />
        <app-demo-field-errors [field]="profileForm.amount()" />
      </div>
      <button type="submit" class="rounded-md bg-blue-500 px-3 py-2 text-white">Validate</button>
    </form>
    <pre class="mt-3 overflow-auto rounded bg-slate-50 p-2 text-xs text-slate-700">{{
      profileForm().value() | json
    }}</pre>
  `,
})
export class ControlsDemo {
  private readonly model = signal({ email: '', acceptTerms: false, amount: 10 });

  readonly profileForm = form(
    this.model,
    (path) => {
      required(path.email, { message: 'Email is required' });
      required(path.acceptTerms, { message: 'You must accept the terms' });
    },
    {
      submission: {
        action: async () => undefined,
      },
    },
  );
}
