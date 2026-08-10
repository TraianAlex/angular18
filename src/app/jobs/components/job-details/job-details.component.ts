import { Component, input } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { JobDetails } from '../../model/job.model';

@Component({
  selector: 'app-job-details',
  template: `
    <div class="header">
      <div>
        <img [ngSrc]="job().companyLogo" width="90" height="90" alt="Company logo" />
        <h1>{{ job().companyName }} - {{ job().title }}</h1>
      </div>

      <div>
        <div class="tags">
          @for (type of job().types; track type) {
            <mark class="tag">{{ type }}</mark>
          }
          @for (industry of job().industries; track industry) {
            <mark class="tag" [innerHTML]="industry"></mark>
          }
        </div>
      </div>
    </div>
    <div class="details">
      <div>
        <span>Publication date: </span>
        <span data-test="date">{{ job().publishDate | date: 'MM/dd/yyyy' }}</span>
      </div>
      <div>
        <span>Location: </span>
        <span>{{ job().location }}</span>
      </div>
      <div>
        <span>Reference: </span>
        <span>{{ job().reference }}</span>
      </div>
      <div>
        <span>Description: </span>
        <span [innerHTML]="job().description"></span>
      </div>
    </div>
  `,
  styleUrls: ['job-details.component.scss'],
  imports: [NgOptimizedImage, DatePipe],
})
export class JobDetailsComponent {
  readonly job = input.required<JobDetails>();
}
