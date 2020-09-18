import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Player } from '../../models/player.model';
import { PlayersService } from '../../services/players.service';
import { MultiplayerService } from '../../services/multiplayer.service';
import { AuthService } from '../../services/auth.service';
import { DbService } from '../../services/db.service';


@Component({
  selector: 'bin-connected-players',
  templateUrl: './connected-players.component.html',
  styleUrls: ['./connected-players.component.less']
})
export class ConnectedPlayersComponent implements OnInit {

  @Output() playRequest = new EventEmitter<Player>();

  constructor(public playersService: PlayersService,
              private multiplayerService: MultiplayerService,
              private authService: AuthService,
              private dbService: DbService) {
  }

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
