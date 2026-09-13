import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessagesService } from '../../services/messages.service';
import { AuthService } from '../../services/auth.service';
import { DbService } from '../../services/db.service';


@Component({
  selector: 'bin-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {
  form: FormGroup;

  @ViewChild('message', { static: false }) inputField: ElementRef;

  constructor(public messagesService: MessagesService,
              private authService: AuthService,
              private fb: FormBuilder,
              private dbService: DbService) {
  }

  get connected(): boolean {
    return this.dbService.connected;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      message: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    this.inputField.nativeElement.focus();
    await this.messagesService.send(this.authService.player, this.form.value.message);
    this.form.reset();
  }

}
