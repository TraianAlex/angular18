import { Injectable, Signal, signal } from '@angular/core';
import { Job } from '../model/job.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private readonly favorites = signal<Job[]>([]);

  getFavorites(): Signal<Job[]> {
    return this.favorites.asReadonly();
  }

  toggleFavorite(job: Job): void {
    this.favorites.update((current) => {
      const exists = current.some((fav) => fav.id === job.id);
      return exists
        ? current.filter((fav) => fav.id !== job.id)
        : [...current, job];
    });
  }
}
