import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { range, times } from 'lodash';
import { filter, takeUntil } from 'rxjs/operators';

import { UnsubscribeDirective } from '../../../shared/unsubscribe.directive';
import { Player } from '../../../models/player.model';
import { BoxComponent } from '../box/box.component';
import { GameService } from '../../../services/game.service';
import { MultiplayerService } from '../../../services/multiplayer.service';
import { Game } from '../../../models/game.model';
import { fill, zeros } from '../../../shared/utils';


@Component({
  selector: 'bin-grid-opponent',
  templateUrl: './grid-opponent.component.html',
  styleUrls: [
    './grid-opponent.component.less',
    '../grid/grid.component.less']
})
export class GridOpponentComponent extends UnsubscribeDirective implements OnInit {
  range: number[] = [];
  grid: number[][] = [];
  rowValid: boolean[];
  colValid: boolean[];
  success = false;
  opponentWin = false;

  @Input() player: Player;
  @Input() size: number;
  @ViewChildren(BoxComponent) boxes: QueryList<BoxComponent>;

  constructor(private gameService: GameService,
              private multiplayerService: MultiplayerService) {
    super();
  }

  ngOnInit(): void {
    this.range = range(this.size);
    this.init();
    this.gameService.get()
      .pipe(
        takeUntil(this.unsubscribe),
        filter((game: Game) => game.player.uid === this.player.uid))
      .subscribe((game: Game) => {
        this.grid = game.grid;
        this.rowValid = game.rowValid;
        this.colValid = game.colValid;
      });
    this.multiplayerService.playerWin()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.success = true;
        this.opponentWin = false;
      });
    this.multiplayerService.opponentWin()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.success = false;
        this.opponentWin = true;
      });
  }

  reset(): void {
    this.boxes.forEach(b => b.reset());
    this.init();
  }

  private init(): void {
    this.success = false;
    this.opponentWin = false;
    this.rowValid = fill(this.size, false);
    this.colValid = fill(this.size, false);
    times(this.size, () => {
      this.grid.push(zeros(this.size));
    });
  }

}
