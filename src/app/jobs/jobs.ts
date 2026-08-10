import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-jobs',
  imports: [RouterModule],
  templateUrl: './jobs.html',
  styleUrl: './jobs.scss',
})
export class JobsComponent {
  private readonly router = inject(Router);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  readonly jobsTabActive = computed(() => {
    const path = this.url().split('?')[0];
    return path === '/jobs' || path.startsWith('/jobs/job');
  });

  readonly favoritesTabActive = computed(() => this.url().split('?')[0].startsWith('/jobs/favorites'));
}
