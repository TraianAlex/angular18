import { Component, model } from '@angular/core';
// import { FormValueControl } from '@angular/forms';

@Component({
  selector: 'app-star-rating',
  template: `
    <div class="star-container">
      @for (star of [1, 2, 3, 4, 5]; track star) {
      <span class="star" (click)="selectStar(star)">
        {{ star <= value() ? '⭐' : '☆' }}
      </span>
      }
    </div>
  `,
})
export class StarRatingComponent { //  implements FormValueControl<number>
  value = model<number>(0);

  selectStar(rating: number): void {
    this.value.set(rating); // Automatic sync.
  }
}
