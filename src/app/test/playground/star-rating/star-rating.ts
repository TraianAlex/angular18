import { Component, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'app-star-rating',
  templateUrl: 'star-rating.html',
  styleUrl: 'star-rating.scss',
})
export class StarRatingComponent implements FormValueControl<number> {
  // Implements the required value model for FormValueControl
  value = model<number>(0);
  stars = Array.from({ length: 5 }, (_, i) => i + 1);
}
