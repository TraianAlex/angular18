import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NbaService } from './services/nba.service';
import { Stats, Team } from './types/data.types';
import { TeamStats } from './team-stats/team-stats';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-nba',
  imports: [AsyncPipe, TeamStats],
  templateUrl: './nba.html',
  styleUrls: ['./nba.scss'],
})
export class Nba {
  private destroyRef = inject(DestroyRef);
  protected nbaService = inject(NbaService);

  protected teams$ = this.nbaService.getAllTeams();

  teamSelected = signal<Team | undefined>(undefined);
  teamStats = signal<Stats>({} as Stats);

  selectTeam(team: Team) {
    this.teamSelected.set(team);
    this.nbaService
      .getStatsFromGames(team)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((stats) => {
        this.teamStats.set(stats);
      });
  }
}
