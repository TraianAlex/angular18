import { Component, input } from '@angular/core';
import { Movie } from '../model/movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.html',
  styleUrl: './movie-item.scss',
})
export class MovieItem {
  movie = input.required<Movie>();
}
