import { Component, inject, Signal } from '@angular/core';
import { JobItemComponent } from '../../components/job-item/job-item.component';
import { FavoriteService } from '../../services/favorite.service';
import { Job } from '../../model/job.model';

@Component({
  selector: 'app-favorites',
  template: `
    @if (favorites().length > 0) {
      <ul>
        @for (favorite of favorites(); track favorite.id) {
          <li>
            <app-job-item [job]="favorite" data-test="job" />
          </li>
        }
      </ul>
    } @else {
      <h5 data-test="noFav">No favorite selected</h5>
    }
  `,
  styleUrls: ['favorites.page.scss'],
  imports: [JobItemComponent],
})
export class FavoritesPage {
  favorites: Signal<Job[]> = inject(FavoriteService).getFavorites();
}
