import { inject, Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, MovieDetails } from '../model/movie.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  protected httpClient = inject(HttpClient);

  getMovies(): Signal<Movie[]> {
    return toSignal(this.httpClient.get<Movie[]>('/movies'), { initialValue: [] });
  }

  getMovieDetails(id: string): Observable<MovieDetails> {
    return this.httpClient.get<MovieDetails>(`/movies/${id}`);
  }
}
