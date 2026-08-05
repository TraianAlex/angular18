import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ConfiguratorService } from './configurator.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.html',
  styleUrl: './cars.scss',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class CarsComponent {
  service = inject(ConfiguratorService);
}
