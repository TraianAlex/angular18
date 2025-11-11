import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Signals2Component } from '../signals2/signals2.component';

@Component({
  selector: 'app-signals',
  imports: [RouterOutlet, Signals2Component],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsComponent {
  clicks = 0;

  eventReceived() {
    this.clicks++;
  }
}
