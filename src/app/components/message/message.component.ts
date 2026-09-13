import { Component, Input, OnInit } from '@angular/core';

import { Message } from '../../models/message.model';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';


@Component({
    selector: 'bin-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css'],
    imports: [NgIf]
})
export class MessageComponent implements OnInit {
  @Input() message: Message;

  constructor(private authService: AuthService) {
  }

  get yourself(): boolean {
    return this.message.sender.uid === this.authService.player.uid;
  }

  get someoneElse(): boolean {
    return !this.yourself;
  }

  ngOnInit(): void {
    return;
  }

}
