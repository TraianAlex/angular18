import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Job } from '../../model/job.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-job-item',
  template: `
    @if (job(); as job) {
      <div class="job-item">
        <img [ngSrc]="job.companyLogo" width="50" height="50" alt="Company logo" />
        <div>
          <h4 [routerLink]="['/jobs/job/' + job.id]">{{ job.title }}</h4>
          <small class="subtitle">
            <span>Company: {{ job.companyName }}</span>
          </small>
        </div>
      </div>
    }
  `,
  styleUrls: ['job-item.component.scss'],
  imports: [RouterLink, NgOptimizedImage],
})
export class JobItemComponent {
  readonly job = input<Job | undefined>(undefined);
}
