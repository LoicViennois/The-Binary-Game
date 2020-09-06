import { Injectable } from '@angular/core'
import { interval } from 'rxjs'
import { takeWhile } from 'rxjs/operators'

import { createPlayer, Player } from '../models/player.model'
import { AngularFireAuth, AngularFirestore, AngularFirestoreCollection } from '../mocks/angular-fire'


@Injectable()
export class AuthService {
  player: Player = null
  checkinInterval = 3000
  timeoutInterval = 3 * this.checkinInterval
  private playersStore: AngularFirestoreCollection<Player>

  constructor (private afAuth: AngularFireAuth,
               private afStore: AngularFirestore) {
    this.playersStore = this.afStore.collection('players')
  }

  loggedIn (): boolean {
    return this.player !== null
  }

  async login (username: string) {
    const uid = await this.afAuth.auth.signInAnonymously()
    this.player = createPlayer({
      uid: uid,
      name: username,
    })
    this.playersStore.doc(this.player.uid).set(this.player)
    interval(this.checkinInterval)
      .pipe(takeWhile(() => this.player != null))
      .subscribe(() => {
        this.playersStore.doc(this.player.uid).update({
          lastCheckin: Date.now()
        })
      })
  }

  async logout () {
    await this.afAuth.auth.signOut()
    this.player = null
  }

}
