import { inject, Injectable, Injector, runInInjectionContext, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, MovieDetails } from '../model/movie.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  protected httpClient = inject(HttpClient);
  private injector = inject(Injector);

  /** Created once — avoid calling toSignal() on every getMovies()/filter. */
  private readonly movies = toSignal(this.httpClient.get<Movie[]>('/movies'), {
    initialValue: [] as Movie[],
  });

  getMovies(): Signal<Movie[]> {
    return this.movies;
  }

  getMovieDetails(id: string): Signal<MovieDetails | undefined> {
    return runInInjectionContext(this.injector, () =>
      toSignal(this.httpClient.get<MovieDetails>(`/movies/${id}`), {
        initialValue: undefined,
      }),
    );
  }

  filterMovieList(title = '', year = ''): Movie[] {
    return this.movies().filter(
      (movie) =>
        (year.length < 4 ||
          (year.length === 4 && movie.release_date.split('-')[0].includes(year))) &&
        movie.title.toLowerCase().includes(title.toLowerCase()),
    );
  }
}
