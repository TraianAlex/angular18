import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { Movie, MovieDetails } from '../model/movie.model';
import { SelectDirective } from '../../shared/directives/select/select.directive';
import { MoviesService } from '../services/movies.service';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HighlightDirective } from '../../shared/directives/highlight/highlight.directive';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.html',
  styleUrl: './movie-item.scss',
  imports: [SelectDirective, HighlightDirective],
})
export class MovieItem {
  protected destroyRef = inject(DestroyRef);
  protected movieService = inject(MoviesService);

  movie = input.required<Movie>();

  protected movieDetails = signal<MovieDetails | undefined>(undefined);
  protected showDetails = signal(false);

  color = '#ccc';

  toggleDetails() {
    this.showDetails.update((show) => !show);
    if (this.showDetails()) {
      this.movieService
        .getMovieDetails(this.movie().id)
        .pipe(take(1), takeUntilDestroyed(this.destroyRef))
        .subscribe((details) => {
          this.movieDetails.set(details);
        });
    }
  }
}
