import { Component, signal } from '@angular/core';
import { DateRangePickerComponent } from '../shared/components/date-range-picket';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DateRangePickerComponent],
  template: `
    <date-range-picker minDate="2024-06-03" [(startDate)]="start" [(endDate)]="end" />
    <pre>
   Your selection:
      {{ start() }} to {{ end() }}
    </pre
    >
  `,
})
export class DateRangePicker {
  // We want to set the default start date. Any future
  // updates will be forwarded to that signall automatically
  start = signal('2024-06-05');
  // No default end date
  end = signal('');
}
