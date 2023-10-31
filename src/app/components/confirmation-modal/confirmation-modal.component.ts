import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  isOpen = false;

  @Output() confirmEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  confirm() {
    this.confirmEvent.emit();
    this.close();
  }

  cancel() {
    this.cancelEvent.emit();
    this.close();
  }
}
