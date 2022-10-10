import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { HighScore } from '../models/high-scores.model';
import { getUser, Player } from '../models/player.model';


@Injectable()
export class HighScoresService {
  highScores: Observable<HighScore[]>;
  private gameFilter: Subject<number>;
  private highScoresStore: AngularFirestoreCollection<HighScore>;

  constructor(private afStore: AngularFirestore) {
    this.highScoresStore = this.afStore.collection('high-scores');
    this.gameFilter = new Subject();
    this.highScores = this.gameFilter.pipe(
      switchMap(game => {
          return this.afStore.collection<HighScore>('high-scores', (ref) => {
            return ref.orderBy('time', 'asc').where('game', '==', game).limit(10);
          }).valueChanges();
        }
      )
    );
  }

  get(game: number): void {
    this.gameFilter.next(game);
  }

  async add(game: number, player: Player, time: number): Promise<void> {
    const score = {
      game,
      user: getUser(player),
      time
    };
    await this.highScoresStore.add(score);
  }

}
