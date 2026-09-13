import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Game } from '../models/game.model';
import { WebsocketService } from './websocket.service';


@Injectable()
export class GameService {
  private websocket = inject(WebsocketService);

  private game: Subject<Game>;

  constructor() {
    // TODO: replace webSocket by firestore
    this.game = this.websocket.connect('game');
  }

  get(): Observable<Game> {
    return this.game.asObservable();
  }

  update(game: Game): void {
    this.game.next(game);
  }
}
