import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-reaction-picker',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReactionPickerComponent),
      multi: true,
    },
  ],
  template: `
    <div class="star-container">
      <div [class.disabled]="isDisabled()">
        <label>
          How do you feel?
          <span class="font-bold text-red-500 mr-2">*</span>
        </label>
        @for (emoji of reactions; track emoji) {
          <button (click)="select(emoji)" [disabled]="isDisabled()">
            {{ emoji }}
          </button>
        }
      </div>
      <div class="text-2xl">
        {{ value() }}
      </div>
      <div>
        {{ isDisabled() }}
      </div>
    </div>
  `,
})
export class ReactionPickerComponent implements ControlValueAccessor {
  readonly value = signal<string>('');
  readonly isDisabled = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  reactions = ['😀', '😍', '🤔', '😢', '😡'];

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  select(emoji: string): void {
    if (this.isDisabled()) return;
    this.value.set(emoji);
    this.onChange(emoji);
    this.onTouched();
  }
}
