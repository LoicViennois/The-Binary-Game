import { Component, ViewChild, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'bin-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  private modalService = inject(NgbModal);

  title: string;
  message: string;

  @ViewChild('modal', { static: true }) modal;

  open(title: string, message: string): Promise<any> {
    this.title = title;
    this.message = message;
    return this.modalService.open(this.modal).result;
  }

}
