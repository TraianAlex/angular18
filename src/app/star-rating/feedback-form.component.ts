import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ReactionPickerComponent } from './star-rating2.component';

@Component({
  selector: 'app-feedback-form',
  imports: [ReactionPickerComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="feedbackForm" (ngSubmit)="submitFeedback()">
      <label class="block text-sm font-medium text-gray-700 mb-2">Your Feedback:</label>
      <textarea
        class="w-full border border-gray-300 rounded-md p-2 mb-4"
        formControlName="feedback"
        rows="4"
      ></textarea>
      <app-reaction-picker [formControl]="feedbackForm.controls.reaction"></app-reaction-picker>
      <button class="bg-blue-500 text-white px-4 py-2 rounded-md" type="submit" [disabled]="!feedbackForm.valid">
        Submit
      </button>
    </form>
  `,
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm = new FormGroup({
    feedback: new FormControl('', [Validators.required, Validators.minLength(10)]),
    reaction: new FormControl({ value: '', disabled: true }, [Validators.required]),
  });

  ngOnInit() {
    // Enable reaction picker after user types something
    this.feedbackForm.controls.feedback.valueChanges.subscribe(value => {
      if (value && value.length > 0) {
        this.feedbackForm.controls.reaction.enable();
      } else {
        this.feedbackForm.controls.reaction.disable();
      }
    });
  }

  submitFeedback(): void {
    if (this.feedbackForm.valid) {
      console.log('Form value:', this.feedbackForm.value);
      // { feedback: "This is amazing!", reaction: "😍" }
    }
  }
}
