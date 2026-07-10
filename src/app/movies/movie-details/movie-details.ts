import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MinToDurationPipe } from '../../shared/pipes/min-to-duration.pipe';
import { MillionDollarPipe } from '../../shared/pipes/million-dollar.pipe';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: 'movie-details.html',
  styleUrls: ['movie-details.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NgOptimizedImage, MillionDollarPipe, MinToDurationPipe],
})
export class MovieDetailsComponent {
  private movieId = inject(ActivatedRoute).snapshot.paramMap.get('id') ?? '';
  protected movie = inject(MoviesService).getMovieDetails(this.movieId);
}
