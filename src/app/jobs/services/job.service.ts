import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Job, JobDetails } from '../model/job.model';
import { ALL_JOBS, DETAILS_MAP } from '../mocks';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  getJobs(): Observable<Job[]> {
    return of(ALL_JOBS);
  }

  getJob(jobId: string): Observable<JobDetails> {
    return of(DETAILS_MAP[+jobId]);
  }
}
