import { Component, computed, inject, input, output, signal, Signal } from '@angular/core';
import { Movie, MovieDetails } from '../model/movie.model';
// import { SelectDirective } from '../../shared/directives/select/select.directive';
import { MoviesService } from '../services/movies.service';
import { MillionDollarPipe } from '../../shared/pipes/million-dollar.pipe';
import { MinToDurationPipe } from '../../shared/pipes/min-to-duration.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.html',
  styleUrl: './movie-item.scss',
  imports: [MillionDollarPipe, MinToDurationPipe, RouterLink],
})
export class MovieItem {
  protected movieService = inject(MoviesService);

  movie = input.required<Movie>();
  isFavorite = input<boolean>(false);
  toggleFavorite = output<Movie>();

  protected showDetails = signal(false);

  /** Holds the Signal returned by the service (created once on first open). */
  private detailsSource = signal<Signal<MovieDetails | undefined> | undefined>(undefined);

  /** Unwrapped details for the template / select directive. */
  protected movieDetails = computed(() => this.detailsSource()?.() ?? undefined);

  // toggleDetails() {
  //   this.showDetails.update((show) => !show);
  //   if (this.showDetails() && !this.detailsSource()) {
  //     this.detailsSource.set(this.movieService.getMovieDetails(this.movie().id));
  //   }
  // }
}
