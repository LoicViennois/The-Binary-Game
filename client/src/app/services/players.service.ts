import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { sortBy } from 'lodash'

import { Player } from '../models/player.model'
import { AuthService } from './auth.service'
import { AngularFirestore, AngularFirestoreCollection } from '../mocks/angular-fire'


@Injectable()
export class PlayersService {
  players: Observable<Player[]>
  private playersStore: AngularFirestoreCollection<Player[]>

  constructor (private afStore: AngularFirestore,
               private authService: AuthService) {
    this.playersStore = this.afStore.collection<Player[]>('players', (ref) => {
      return ref.where('lastCheckin', '>', Date.now() - this.authService.timeoutInterval)
    })
    this.players = this.playersStore.valueChanges().pipe(
      map((players) => players.filter((p) => p.lastCheckin > (Date.now() - this.authService.timeoutInterval))),
      map((players) => sortBy(players, 'name'))
    )
  }

  async playing () {
    await this.playersStore.doc(this.authService.player.uid).update({
      playing: true
    })
  }

  async notPlaying () {
    await this.playersStore.doc(this.authService.player.uid).update({
      playing: false
    })
  }

  async inParty () {
    await this.playersStore.doc(this.authService.player.uid).update({
      inParty: true
    })
  }

  async notInParty () {
    await this.playersStore.doc(this.authService.player.uid).update({
      inParty: false
    })
  }

}
