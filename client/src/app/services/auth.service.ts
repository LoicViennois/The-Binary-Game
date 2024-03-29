import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { createPlayer, Player } from '../models/player.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable()
export class AuthService {
  player: Player = null;
  checkinInterval = 3000;
  timeoutInterval = 3 * this.checkinInterval;
  private playersStore: AngularFirestoreCollection<Player>;

  constructor(private afAuth: AngularFireAuth,
              private afStore: AngularFirestore) {
    this.playersStore = this.afStore.collection('players');
  }

  loggedIn(): boolean {
    return this.player !== null;
  }

  async login(username: string): Promise<void> {
    const credentials = await this.afAuth.signInAnonymously();
    this.player = createPlayer({
      uid: credentials.user.uid,
      name: username,
    });
    await this.playersStore.doc(this.player.uid).set(this.player);
    interval(this.checkinInterval)
      .pipe(takeWhile(() => this.player != null))
      .subscribe(() => {
        this.playersStore.doc(this.player.uid).update({
          lastCheckin: Date.now()
        });
      });
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    this.player = null;
  }

}
