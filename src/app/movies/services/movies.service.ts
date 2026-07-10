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

  getMovies(): Signal<Movie[]> {
    return toSignal(this.httpClient.get<Movie[]>('/movies'), { initialValue: [] });
  }

  getMovieDetails(id: string): Signal<MovieDetails | undefined> {
    // return runInInjectionContext(this.injector, () =>
    return toSignal(this.httpClient.get<MovieDetails>(`/movies/${id}`), {
      initialValue: undefined,
    });
    //  );
    //);
  }
}
