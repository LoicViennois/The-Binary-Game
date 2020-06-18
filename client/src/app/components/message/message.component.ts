import { Component, Input, OnInit } from '@angular/core'

import { Message } from '../../models/message.model'
import { AuthService } from '../../services/auth.service'


@Component({
  selector: 'bin-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message: Message

  constructor (private authService: AuthService) {
  }

  ngOnInit () {
  }

  get yourself(): boolean {
    return this.message.sender.uid === this.authService.player.uid
  }

  get someoneElse(): boolean {
    return !this.yourself
  }

}
