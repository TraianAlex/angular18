import { Injectable, signal } from '@angular/core';
import { Movie } from '../model/movie.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesSignal = signal<Movie[]>([]);

  // readonly favorites = this.favoritesSignal.asReadonly();

  toggleFavorite(movie: Movie): void {
    let index = this.favoritesSignal().findIndex((m) => m.id === movie.id);
    if (index == -1) {
      this.favoritesSignal.set([...this.favoritesSignal(), movie]);
    } else {
      this.favoritesSignal().splice(index, 1);
      this.favoritesSignal.set(this.favoritesSignal());
    }
  }

  isFavorite(movie: Movie): boolean {
    return this.favoritesSignal().find((m) => m.id === movie.id) != null;
  }
}
