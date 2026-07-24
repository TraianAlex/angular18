import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.html',
  styleUrl: './cars.scss',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class CarsComponent {}
