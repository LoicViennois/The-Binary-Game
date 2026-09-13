import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';

import { Player } from '../../models/player.model';
import { PlayersService } from '../../services/players.service';
import { MultiplayerService } from '../../services/multiplayer.service';
import { AuthService } from '../../services/auth.service';
import { DbService } from '../../services/db.service';
import { AsyncPipe } from '@angular/common';


@Component({
    selector: 'bin-connected-players',
    templateUrl: './connected-players.component.html',
    styleUrls: ['./connected-players.component.less'],
    imports: [AsyncPipe]
})
export class ConnectedPlayersComponent implements OnInit {
  playersService = inject(PlayersService);
  private multiplayerService = inject(MultiplayerService);
  private authService = inject(AuthService);
  private dbService = inject(DbService);


  @Output() playRequest = new EventEmitter<Player>();

  get connected(): boolean {
    return this.dbService.connected;
  }

  private get player(): Player {
    return this.authService.player;
  }

  private get opponent(): Player {
    return this.multiplayerService.opponent;
  }

  ngOnInit(): void {
    return;
  }

  playWith(player: Player): void {
    this.playRequest.emit(player);
  }

  isOpponent(player: Player): boolean {
    return this.opponent ? player.uid === this.opponent.uid : false;
  }

  inParty(player: Player): boolean {
    return player.inParty && (this.opponent === null || player.uid !== this.opponent.uid);
  }

  isYou(player: Player): boolean {
    return player.uid === this.player.uid;
  }

}
