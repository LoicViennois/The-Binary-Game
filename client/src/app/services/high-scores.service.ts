import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { HighScore } from '../models/high-scores.model';
import { getUser, Player } from '../models/player.model';


@Injectable()
export class HighScoresService {
  bestHighScores: Observable<HighScore[]>;
  private gameFilter: Subject<number>;
  private highScoresStore: AngularFirestoreCollection<HighScore>;

  constructor(private afStore: AngularFirestore) {
    this.highScoresStore = this.afStore.collection('high-scores');
    this.gameFilter = new Subject();
    this.bestHighScores =  this.gameFilter.pipe(
      switchMap((game) => this.getBestHighScores(game))
    );
  }

  setGame(game: number): void {
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

  private getBestHighScores(game: number): Observable<HighScore[]> {
    return this.afStore.collection<HighScore>('high-scores', (ref) => {
        return ref
          .orderBy('time', 'asc')
          .where('game', '==', game);
      }).valueChanges().pipe(
        map(highScores => this.getBestForEachUser(highScores))
      );
  }

  private getBestForEachUser(highScores: HighScore[]): HighScore[] {
    const bestHighScoresMap = new Map<string, HighScore>();
    console.log(highScores.length)

    for (const highScore of highScores) {
      const userName = highScore.user.name.toLowerCase();
      const existingScore = bestHighScoresMap.get(userName);
      if (!existingScore || highScore.time < existingScore.time) {
        bestHighScoresMap.set(userName, highScore);
      }
    }

    return Array.from(bestHighScoresMap.values()).slice(0, 10)
  }
}
