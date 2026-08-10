import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { JobsService } from '../../services/job.service';
import { JobItemComponent } from '../../components/job-item/job-item.component';
import { FavoriteService } from '../../services/favorite.service';
import { Job } from '../../model/job.model';

@Component({
  selector: 'app-jobs-page',
  template: `
    <ul>
      @for (job of jobs(); track job.id) {
        <li>
          <app-job-item [job]="job" />
          <span
            class="icon-star"
            [class.active]="isFavorite(job)"
            (click)="setFavorite(job)"
          ></span>
        </li>
      }
    </ul>
  `,
  styleUrl: './jobs.page.scss',
  imports: [JobItemComponent],
})
export class JobsPage {
  jobsService = inject(JobsService);
  favoriteService = inject(FavoriteService);

  jobs = toSignal(this.jobsService.getJobs());
  favorites = this.favoriteService.getFavorites();

  setFavorite(job: Job): void {
    this.favoriteService.toggleFavorite(job);
  }

  isFavorite(job: Job): boolean {
    return this.favorites().some((fav) => fav.id === job.id);
  }
}
