import { Component, computed, inject, signal } from '@angular/core';
import { MovieItem } from './movie-item/movie-item';
import { MoviesService } from './services/movies.service';
import { HighlightDirective } from '../shared/directives/highlight/highlight.directive';
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
  imports: [MovieItem, HighlightDirective],
})
export class Movies {
  private readonly moviesService = inject(MoviesService);
  protected favoritesService = inject(FavoritesService);

  private titleFilter = signal('');
  private yearFilter = signal('');

  protected movies = computed(() => this.moviesService.filterMovieList(this.titleFilter(), this.yearFilter()));

  color = '#ccc';

  filter(title: string, year: string) {
    this.titleFilter.set(title);
    this.yearFilter.set(year);
  }
}
