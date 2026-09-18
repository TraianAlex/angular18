import { Component, input, model } from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';

@Component({
  selector: 'app-basic-toggle',
  template: `
    <div
      class="mb-4 flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
    >
      <span class="text-sm font-medium text-slate-700">{{ label() }}</span>
      <button
        type="button"
        role="switch"
        class="toggle-track"
        [class.active]="checked()"
        [attr.aria-checked]="checked()"
        [attr.aria-label]="label()"
        (click)="toggle()"
      >
        <span class="toggle-slider"></span>
      </button>
      <span class="state-label" [class.on]="checked()">{{ checked() ? 'On' : 'Off' }}</span>
    </div>
  `,
  styleUrl: './basic-toggle.scss',
})
export class BasicToggle implements FormCheckboxControl {
  /** Whether the toggle is checked */
  checked = model<boolean>(false);
  label = input('Remember me');

  toggle() {
    this.checked.update((val) => !val);
  }
}
