import { Component, input, model } from '@angular/core';
// import { FormValueControl } from '@angular/forms';

@Component({
  selector: 'app-reaction-picker',
  template: `
    <div class="star-container">
      <div [class.disabled]="disabled()">
        <label>
          How do you feel? @if (required()) {
          <span class="font-bold text-red-500 mr-2">*</span>
          }
        </label>
        @for (emoji of reactions; track emoji) {
        <button (click)="select(emoji)" [disabled]="disabled()">
          {{ emoji }}
        </button>
        }
      </div>
      <div class="text-2xl">
        {{ value() }}
      </div>
      <div>
        {{ disabled() }}
      </div>
    </div>
  `,
})
export class ReactionPickerComponent { //  implements FormValueControl<string>
  value = model<string>('');
  disabled = input<boolean>(false); // Automatic sync
  required = input<boolean>(false); // Automatic sync

  reactions = ['😀', '😍', '🤔', '😢', '😡'];

  select(emoji: string): void {
    this.value.set(emoji);
  }
}
