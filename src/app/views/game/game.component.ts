import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { UnsubscribeDirective } from '../../shared/unsubscribe.directive';
import { GridComponent } from '../../components/game/grid/grid.component';
import { GridOpponentComponent } from '../../components/game/grid-opponent/grid-opponent.component';
import { TimerService } from '../../services/timer.service';
import { HighScoresService } from '../../services/high-scores.service';
import { AuthService } from '../../services/auth.service';
import { PlayersService } from '../../services/players.service';
import { MultiplayerService } from '../../services/multiplayer.service';
import { Player } from '../../models/player.model';


@Component({
  selector: 'bin-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less', '../../shared/panels.less']
})
export class GameComponent extends UnsubscribeDirective implements OnInit, OnDestroy {
  size: number;
  stopped = false;
  success = false;
  opponentWin = false;
  winTime: number;
  expandedLeft = false;
  expandedRight = false;

  @ViewChild(GridComponent, { static: true }) grid: GridComponent;
  @ViewChild(GridOpponentComponent, { static: true }) gridOpponent: GridOpponentComponent;

  constructor(public timerService: TimerService,
              private route: ActivatedRoute,
              private highScoresService: HighScoresService,
              private authService: AuthService,
              private playersService: PlayersService,
              private multiplayerService: MultiplayerService,
              private router: Router) {
    super();
  }

  get opponent(): Player {
    return this.multiplayerService.opponent;
  }

  get gameFinished(): boolean {
    return this.success || this.opponentWin;
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
    this.multiplayerService.playerWin()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(time => {
        this.stopped = true;
        this.success = true;
        this.opponentWin = false;
        this.winTime = time;
      });
    this.multiplayerService.opponentWin()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(time => {
        this.stopped = true;
        this.success = false;
        this.opponentWin = true;
        this.winTime = time;
      });
    this.multiplayerService.gameRestarting()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.reset();
      });
    this.multiplayerService.gameEnding()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.router.navigate(['/home']).then();
      });
    this.playersService.playing().then();
  }

  async onCompleted(completed: boolean): Promise<void> {
    if (completed) {
      this.stopTimer();
      if (this.opponent) {
        this.multiplayerService.winGame(this.time);
      } else {
        this.stopped = true;
        this.success = true;
        this.winTime = this.time;
      }
      await this.saveHighScore();
    }
  }

  restart(): void {
    this.grid.reset();
    if (this.opponent) {
      this.gridOpponent.reset();
      this.multiplayerService.restartGame(this.size);
    }
    this.init();
  }

  reset(): void {
    this.grid.reset();
    if (this.opponent) {
      this.gridOpponent.reset();
    }
    this.init();
  }

  endGame(): void {
    if (this.opponent) {
      this.multiplayerService.endGame(this.size);
    }
    this.router.navigate(['/home']).then();
  }

  stopGame(): void {
    this.stopTimer();
    this.stopped = true;
  }

  ngOnDestroy(): void {
    this.playersService.notPlaying().then();
    super.ngOnDestroy();
  }

  private init(): void {
    this.timerService.start();
    this.stopped = false;
    this.success = false;
    this.opponentWin = false;
  }

  private stopTimer(): void {
    this.timerService.stop();
  }

  private async saveHighScore(): Promise<void> {
    await this.highScoresService.add(this.size, this.player, this.time);
  }

}
