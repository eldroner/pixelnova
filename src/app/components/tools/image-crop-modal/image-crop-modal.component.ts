import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-crop-modal',
  standalone: true,
  imports: [CommonModule, ImageCropperComponent],
  templateUrl: './image-crop-modal.component.html',
  styleUrls: ['./image-crop-modal.component.scss']
})
export class ImageCropModalComponent {
  @Input() imageChangedEvent: any = null; // Recibe el evento de selección de archivos
  @Output() imageCropped = new EventEmitter<string>(); // Emite la imagen recortada
  @Output() modalClosed = new EventEmitter<void>(); // Emite cuando se cierra el modal

  croppedImage: string | null = null; // Imagen recortada

  // Método que se ejecuta cuando la imagen se recorta
  imageCroppedEvent(event: ImageCroppedEvent) {
    if (event.blob) {
      const reader = new FileReader();
      reader.readAsDataURL(event.blob); // Convierte el Blob a Base64
      reader.onloadend = () => {
        this.croppedImage = reader.result as string; // Actualiza croppedImage
        console.log("Imagen recortada:", this.croppedImage); // Depuración
      };
    } else {
      console.warn("⚠️ No se pudo obtener la imagen recortada.");
    }
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