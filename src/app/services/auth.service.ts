import { Injectable } from '@angular/core';

import { createPlayer, Player } from '../models/player.model';

const STORAGE_KEY = 'tb_user';

@Injectable()
export class AuthService {
  player: Player | null = null;

  constructor() {
    this.loadPlayer();
  }

  loggedIn(): boolean {
    return this.player !== null;
  }

  async login(username: string): Promise<void> {
    const trimmed = username.trim();
    this.player = createPlayer({
      uid: trimmed.toLowerCase(),
      name: trimmed,
    });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.player));
    } catch {
      // ignore storage errors
    }
  }

  async logout(): Promise<void> {
    this.player = null;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
  }

  private loadPlayer(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Player;
        if (parsed && parsed.name) {
          this.player = parsed;
        }
      }
    } catch {
      this.player = null;
    }
  }
}
