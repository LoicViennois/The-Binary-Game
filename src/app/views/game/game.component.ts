import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GridComponent } from '../../components/game/grid/grid.component';
import { TimerService } from '../../services/timer.service';
import { HighScoresService } from '../../services/high-scores.service';
import { AuthService } from '../../services/auth.service';
import { Player } from '../../models/player.model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { HighScoresComponent } from '../../components/game/high-scores/high-scores.component';


@Component({
    selector: 'bin-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.less', '../../shared/panels.less'],
    imports: [GridComponent, HighScoresComponent, AsyncPipe, DatePipe]
})
export class GameComponent implements OnInit {
  timerService = inject(TimerService);
  private route = inject(ActivatedRoute);
  private highScoresService = inject(HighScoresService);
  private authService = inject(AuthService);
  private router = inject(Router);

  size: number;
  stopped = false;
  success = false;
  winTime: number;
  expandedLeft = false;
  expandedRight = false;

  @ViewChild(GridComponent, { static: true }) grid: GridComponent;

  get gameFinished(): boolean {
    return this.success;
  }

  private get time(): number {
    return this.timerService.time.value;
  }

  private get player(): Player {
    return this.authService.player;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.size = +params.size;
      this.init();
    });
  }

  async onCompleted(completed: boolean): Promise<void> {
    if (completed) {
      this.stopTimer();
      this.stopped = true;
      this.success = true;
      this.winTime = this.time;
      await this.saveHighScore();
    }
  }

  restart(): void {
    this.grid.reset();
    this.init();
  }

  endGame(): void {
    this.router.navigate(['/home']).then();
  }

  stopGame(): void {
    this.stopTimer();
    this.stopped = true;
  }

  private init(): void {
    this.timerService.start();
    this.stopped = false;
    this.success = false;
  }

  private stopTimer(): void {
    this.timerService.stop();
  }

  private async saveHighScore(): Promise<void> {
    await this.highScoresService.add(this.size, this.player, this.time);
  }

}
