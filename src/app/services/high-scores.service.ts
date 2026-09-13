import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { HighScore } from '../models/high-scores.model';
import { getUser, Player } from '../models/player.model';

const STORAGE_KEY = 'tb_high_scores';

@Injectable()
export class HighScoresService {
  private currentGame: number | null = null;
  private scoresSubject = new BehaviorSubject<HighScore[]>([]);
  readonly bestHighScores: Observable<HighScore[]> = this.scoresSubject.asObservable();

  setGame(game: number): void {
    this.currentGame = game;
    this.refreshScores();
  }

  async add(game: number, player: Player, time: number): Promise<void> {
    const scores = this.getStoredScores();
    const newScore: HighScore = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      game,
      user: getUser(player),
      time
    };
    scores.push(newScore);
    this.saveStoredScores(scores);

    if (this.currentGame === game) {
      this.refreshScores();
    }
  }

  private refreshScores(): void {
    if (this.currentGame === null) {
      this.scoresSubject.next([]);
      return;
    }
    const allScores = this.getStoredScores();
    const gameScores = allScores.filter(s => s.game === this.currentGame);
    const sorted = gameScores.sort((a, b) => a.time - b.time);
    const best = this.getBestForEachUser(sorted);
    this.scoresSubject.next(best);
  }

  private getBestForEachUser(highScores: HighScore[]): HighScore[] {
    const bestHighScoresMap = new Map<string, HighScore>();

    for (const highScore of highScores) {
      const userName = highScore.user.name.toLowerCase();
      if (!bestHighScoresMap.has(userName)) {
        bestHighScoresMap.set(userName, highScore);
      }
    }

    return Array.from(bestHighScoresMap.values()).slice(0, 10);
  }

  private getStoredScores(): HighScore[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? (JSON.parse(data) as HighScore[]) : [];
    } catch {
      return [];
    }
  }

  private saveStoredScores(scores: HighScore[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    } catch {
      // ignore storage errors
    }
  }
}
