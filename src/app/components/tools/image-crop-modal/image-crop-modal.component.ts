import { Component, EventEmitter, Output } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-crop-modal',
  standalone: true,
  imports: [ImageCropperComponent], // Importa ImageCropperComponent directamente
  templateUrl: './image-crop-modal.component.html',
  styleUrls: ['./image-crop-modal.component.scss']
})
export class ImageCropModalComponent {
  imageChangedEvent: any = null; // Evento de cambio de imagen
  croppedImage: string | null = null; // Imagen recortada

  @Output() imageCropped = new EventEmitter<string>(); // Emite la imagen recortada
  @Output() modalClosed = new EventEmitter<void>(); // Emite cuando se cierra el modal

  // Método para cargar la imagen seleccionada
  onFileSelected(event: any) {
    this.imageChangedEvent = event;
  }

  // Método que se ejecuta cuando la imagen se recorta
  imageCroppedEvent(event: ImageCroppedEvent) {
    this.croppedImage = event.base64 || null;
  }

  // Método para confirmar el recorte
  confirmCrop() {
    if (this.croppedImage) {
      this.imageCropped.emit(this.croppedImage); // Emitir la imagen recortada
      this.closeModal();
    }
  }

  // Método para cerrar el modal
  closeModal() {
    this.modalClosed.emit();
  }
}