import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-viewer-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-viewer-modal.component.html',
  styleUrls: ['./image-viewer-modal.component.scss']
})
export class ImageViewerModalComponent {
  @Input() imageUrl: string | null = null;
  @Input() showModal: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}
