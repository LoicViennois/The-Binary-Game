import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bin-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  title: string;
  message: string;

  @ViewChild('modal', { static: true }) modal;

  constructor(private modalService: NgbModal) {
  }

  open(title: string, message: string): Promise<any> {
    this.title = title;
    this.message = message;
    return this.modalService.open(this.modal).result;
  }

}
