import { Component, inject, OnInit, input } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobDetailsComponent } from '../components/job-details/job-details.component';
import { JobsService } from '../services/job.service';
import { JobDetails } from '../model/job.model';

@Component({
  selector: 'app-jobs-details',
  template: `
    <div>
      <button routerLink="/jobs" style="margin-left: 0"><span class="icon-home"></span>Back</button>
      @if ($job | async; as job) {
        <div>
          <app-job-details [job]="job" />
        </div>
      }
    </div>
  `,
  imports: [AsyncPipe, RouterLink, JobDetailsComponent],
})
export class JobDetailsPage implements OnInit {
  jobsService = inject(JobsService);
  readonly jobId = input.required<string>();

  $job!: Observable<JobDetails>;

  ngOnInit() {
    this.$job = this.jobsService.getJob(this.jobId());
  }
}
