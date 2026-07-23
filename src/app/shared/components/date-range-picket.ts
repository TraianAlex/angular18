import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'date-range-picker',
  standalone: true,
  imports: [FormsModule],
  template: `
    Select a date range:
    <input type="date" [(ngModel)]="startDate" [min]="minDate()" [max]="endDate()" />
    <input type="date" [(ngModel)]="endDate" [min]="startDate()" />
  `,
})
export class DateRangePickerComponent {
  minDate = input();
  startDate = model();
  endDate = model();
}
