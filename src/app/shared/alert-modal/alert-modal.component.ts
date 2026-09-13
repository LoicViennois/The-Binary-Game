import { Component, ViewChild, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'bin-alert-modal',
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent {
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
