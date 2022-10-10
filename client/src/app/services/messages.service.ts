import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { Message } from '../models/message.model';
import { getUser, Player } from '../models/player.model';


@Injectable()
export class MessagesService {
  messages: Observable<Message[]>;
  private messageStore: AngularFirestoreCollection<Message>;

  constructor(private afStore: AngularFirestore) {
    this.messageStore = this.afStore.collection('messages', (ref) => {
      return ref.orderBy('timestamp', 'desc').limit(100);
    });
    this.messages = this.messageStore.valueChanges();
  }

  async send(player: Player, text: string): Promise<void> {
    const message: Message = {
      sender: getUser(player),
      text,
      timestamp: Date.now()
    };
    await this.messageStore.add(message);
  }

}
