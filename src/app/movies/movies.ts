import { Component } from '@angular/core';
import { Movie } from './model/movie.model';
import { MovieItem } from './movie-item/movie-item';

@Component({
  selector: 'app-movie',
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
  imports: [MovieItem],
})
export class Movies {
  movie: Movie = {
    id: 'e80d5a37-620e-4be2-92b9-fb1f5262494f',
    title: "Harry Potter and the Philosopher's Stone",
    duration: 152,
    budget: 125,
    release_date: '2001-11-04',
  };
}
