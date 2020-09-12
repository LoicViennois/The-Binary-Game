import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { Message } from '../models/message.model'
import { getUser, Player } from '../models/player.model'
import { AngularFirestore, AngularFirestoreCollection } from '../mocks/angular-fire'


@Injectable()
export class MessagesService {
  messages: Observable<Message[]>
  private messageStore: AngularFirestoreCollection<Message[]>

  constructor (private afStore: AngularFirestore) {
    this.messageStore = this.afStore.collection<Message[]>('messages', (ref) => {
      return ref.orderBy('timestamp', 'desc').limit(100)
    })
    this.messages = this.messageStore.valueChanges()
  }

  async send (player: Player, text: string) {
    const message: Message = {
      sender: getUser(player),
      text: text,
      timestamp: Date.now()
    }
    await this.messageStore.add(message)
  }

}
