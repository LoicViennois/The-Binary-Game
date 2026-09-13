import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { sortBy } from 'lodash';

import { Player } from '../models/player.model';
import { AuthService } from './auth.service';


@Injectable()
export class PlayersService {
  private afStore = inject(AngularFirestore);
  private authService = inject(AuthService);

  players: Observable<Player[]>;
  private playersStore: AngularFirestoreCollection<Player>;

  constructor() {
    this.playersStore = this.afStore.collection('players', (ref) => {
      return ref.where('lastCheckin', '>', Date.now() - this.authService.timeoutInterval);
    });
    this.players = this.playersStore.valueChanges().pipe(
      map((players) => players.filter((p) => p.lastCheckin > (Date.now() - this.authService.timeoutInterval))),
      map((players) => sortBy(players, 'name'))
    );
  }

  async playing(): Promise<void> {
    await this.playersStore.doc(this.authService.player.uid).update({
      playing: true
    });
  }

  async notPlaying(): Promise<void> {
    await this.playersStore.doc(this.authService.player.uid).update({
      playing: false
    });
  }

  async inParty(): Promise<void> {
    await this.playersStore.doc(this.authService.player.uid).update({
      inParty: true
    });
  }

  async notInParty(): Promise<void> {
    await this.playersStore.doc(this.authService.player.uid).update({
      inParty: false
    });
  }

}
