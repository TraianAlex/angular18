import { Component, input, model } from '@angular/core';
// import { FormCheckboxControl } from '@angular/forms';
/*
<div 
      class="toggle-switch"
      [class.checked]="checked()"
      [class.disabled]="disabled()"
      (click)="toggle()">
      <div class="toggle-slider"></div>
    </div>
*/
@Component({
  selector: 'app-toggle-switch',
  template: `
    <button
      type="button"
      role="switch"
      [attr.aria-checked]="checked()"
      [disabled]="disabled()"
      (click)="toggle()"
      [class.opacity-50]="disabled()"
      [class.cursor-not-allowed]="disabled()"
      class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      [class.bg-blue-600]="checked()"
      [class.bg-gray-200]="!checked()"
    >
      <span
        class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
        [class.translate-x-6]="checked()"
        [class.translate-x-1]="!checked()"
      ></span>
    </button>
    <div>
      {{ checked() }}
    </div>
    <div>
      {{ disabled() }}
    </div>
  `,
})
export class ToggleSwitchComponent {
  //  implements FormCheckboxControl
  checked = model<boolean>(false); // Use 'checked' instead of 'value'
  disabled = input<boolean>(false);

  toggle(): void {
    if (!this.disabled()) {
      this.checked.update((current) => !current);
    }
  }
}
