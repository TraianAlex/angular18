import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Stats, Team } from '../types/data.types';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.html',
  styleUrl: './team-stats.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class TeamStats {
  team = input.required<Team>();
  teamStats = input.required<Stats>();
}
