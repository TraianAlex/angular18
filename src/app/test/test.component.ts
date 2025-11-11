import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-test',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {}
