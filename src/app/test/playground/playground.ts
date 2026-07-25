import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent {}
