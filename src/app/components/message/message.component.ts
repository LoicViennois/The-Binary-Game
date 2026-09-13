import { Component, Input, OnInit, inject } from '@angular/core';

import { Message } from '../../models/message.model';
import { AuthService } from '../../services/auth.service';



@Component({
    selector: 'bin-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css'],
    imports: []
})
export class MessageComponent implements OnInit {
  private authService = inject(AuthService);

  @Input() message: Message;

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
