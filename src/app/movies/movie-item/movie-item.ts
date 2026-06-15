import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { Movie, MovieDetails } from '../model/movie.model';
import { SelectDirective } from '../../shared/directives/select/select.directive';
import { MoviesService } from '../services/movies.service';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MillionDollarPipe } from '../../shared/pipes/million-dollar.pipe';
import { MinToDurationPipe } from '../../shared/pipes/min-to-duration.pipe';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.html',
  styleUrl: './movie-item.scss',
  imports: [SelectDirective, MillionDollarPipe, MinToDurationPipe],
})
export class MovieItem {
  protected destroyRef = inject(DestroyRef);
  protected movieService = inject(MoviesService);

  movie = input.required<Movie>();
  isFavorite = input<boolean>(false);
  toggleFavorite = output<Movie>();

  protected movieDetails = signal<MovieDetails | undefined>(undefined);
  protected showDetails = signal(false);

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
