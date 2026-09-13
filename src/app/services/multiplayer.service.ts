import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Player } from '../models/player.model';
import { EventType, GameRequest, GameStart, GameWin, RequestType } from '../models/game.model';
import { WebsocketService } from './websocket.service';
import { PlayersService } from './players.service';
import { AuthService } from './auth.service';


@Injectable()
export class MultiplayerService {
  opponent: Player;

  private gameStart: Subject<GameStart>;
  private gameWin: Subject<GameWin>;
  private gameRequest: Subject<GameRequest>;
  private playerTime: number = null;
  private opponentTime: number = null;

  constructor(private webSocket: WebsocketService,
              private playersService: PlayersService,
              private authService: AuthService) {
    // TODO: replace webSocket by firestore
    this.opponent = null;
    this.gameStart = this.webSocket.connect('game-start');
    this.gameWin = this.webSocket.connect('game-win');
    this.gameRequest = this.webSocket.connect('game-request');
  }

  private get player(): Player {
    return this.authService.player;
  }

  /**
   * Opponent
   */
  playWith(player: Player): void {
    this.opponent = player;
    if (player === null) {
      this.playersService.notInParty().then();
    } else {
      this.playersService.inParty().then();
    }
  }

  /**
   * GameStart
   */
  startGame(size: number): void {
    this.gameStart.next({
      player: this.player,
      size,
      event: EventType.start
    });
  }

  restartGame(size: number): void {
    this.gameStart.next({
      player: this.player,
      size,
      event: EventType.restart
    });
  }

  endGame(size: number): void {
    this.gameStart.next({
      player: this.player,
      size,
      event: EventType.end
    });
  }

  gameStarting(): Observable<number> {
    return this.gameStart.pipe(
      filter(() => this.opponent !== null),
      filter((game: GameStart) => {
        return game.player.uid === this.opponent.uid
          && game.event === EventType.start;
      }),
      map((game: GameStart) => {
        this.playerTime = null;
        this.opponentTime = null;
        return game.size;
      }));
  }

  gameRestarting(): Observable<boolean> {
    return this.gameStart.pipe(
      filter(() => this.opponent !== null),
      filter((game: GameStart) => {
        return game.player.uid === this.opponent.uid
          && game.event === EventType.restart;
      }),
      map(() => {
        this.playerTime = null;
        this.opponentTime = null;
        return true;
      }));
  }

  gameEnding(): Observable<boolean> {
    return this.gameStart.pipe(
      filter(() => this.opponent !== null),
      filter((game: GameStart) => {
        return game.player.uid === this.opponent.uid
          && game.event === EventType.end;
      }),
      map(() => true));
  }

  /**
   * GameWin
   */
  winGame(time: number): void {
    this.gameWin.next({
      player: this.player,
      time
    });
  }

  playerWin(): Observable<number> {
    return this.gameWin.pipe(
      filter((game: GameWin) => game.player.uid === this.player.uid),
      filter((game: GameWin) => {
        this.playerTime = game.time;
        return this.opponentTime === null || this.playerTime < this.opponentTime;
      }),
      map((game: GameWin) => game.time));
  }

  opponentWin(): Observable<number> {
    return this.gameWin.pipe(
      filter((game: GameWin) => game.player.uid === this.opponent.uid),
      filter((game: GameWin) => {
        this.opponentTime = game.time;
        return this.playerTime === null || this.opponentTime < this.playerTime;
      }),
      map((game: GameWin) => game.time));
  }

  /**
   * GameRequest
   */
  sendRequest(player: Player, type = RequestType.request): void {
    this.gameRequest.next({
      from: this.player,
      to: player,
      type,
      accepted: false
    });
  }

  answerRequest(request: GameRequest): void {
    this.gameRequest.next(request);
  }

  requestReceived(): Observable<GameRequest> {
    return this.gameRequest.pipe(
      filter((request: GameRequest) => {
        return request.to.uid === this.player.uid && request.type !== RequestType.response;
      })
    );
  }

  responseReceived(): Observable<GameRequest> {
    return this.gameRequest.pipe(
      filter((request: GameRequest) => {
        return request.from.uid === this.player.uid && request.type === RequestType.response;
      })
    );
  }

}
