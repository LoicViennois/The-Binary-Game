import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bin-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent {
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
