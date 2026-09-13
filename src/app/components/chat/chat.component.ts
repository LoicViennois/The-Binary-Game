import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MessagesService } from '../../services/messages.service';
import { AuthService } from '../../services/auth.service';
import { DbService } from '../../services/db.service';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { MessageComponent } from '../message/message.component';


@Component({
    selector: 'bin-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.less'],
    imports: [NgIf, NgFor, MessageComponent, ReactiveFormsModule, AsyncPipe]
})
export class ChatComponent implements OnInit {
  form: UntypedFormGroup;

  @ViewChild('message', { static: false }) inputField: ElementRef;

  constructor(public messagesService: MessagesService,
              private authService: AuthService,
              private fb: UntypedFormBuilder,
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
