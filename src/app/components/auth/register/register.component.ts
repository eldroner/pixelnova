import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageCropModalComponent } from '../../tools/image-crop-modal/image-crop-modal.component';
import { HeroComponent } from "../../shared/hero/hero.component";
import { SpacerComponent } from "../../shared/spacer/spacer.component"; // Importa el modal

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ImageCropModalComponent, HeroComponent, SpacerComponent], // Importa el modal
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = ''; // ✅ Añadimos la variable para la confirmación de contraseña
  errorMessage = '';

  // Variables para el recorte de la imagen
  showCropModal = false; // Controla la visibilidad del modal
  imageChangedEvent: any = null; // Evento de selección de archivos
  finalImage: string | null = null; // Imagen confirmada
  isImageConfirmed = false; // Control de confirmación

  constructor(private http: HttpClient, private router: Router) {}

  // Abre el modal de recorte y pasa el evento de selección de archivos
  openCropModal(event: any) {
    if (!event.target.files.length) return; // Si no hay archivo, no hace nada
    this.imageChangedEvent = event; // Guarda el evento
    this.showCropModal = true; // Abre el modal
  }

  // Recibe la imagen recortada desde el modal
  onImageCropped(croppedImage: string) {
    this.finalImage = croppedImage; // Asigna la imagen recortada
    this.isImageConfirmed = true; // Marca la imagen como confirmada
    this.showCropModal = false; // Cierra el modal
  }

  // Cierra el modal sin confirmar
  closeCropModal() {
    this.showCropModal = false;
  }

  // Función para redimensionar la imagen
  resizeImage(imageSrc: string, maxSize: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageSrc;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL('image/jpeg', 0.7)); // Reducir calidad para disminuir el tamaño
      };

      img.onerror = error => reject(error);
    });
  }

  // Función para registrar al usuario
  async onRegister() {
    console.log("🔍 Estado antes de registrar:", {
      email: this.email,
      password: this.password,
      isImageConfirmed: this.isImageConfirmed,
      finalImage: this.finalImage
    });

    if (!this.isValidEmail(this.email)) {
      alert('❌ Introduce un correo electrónico válido.');
      return;
    }

    if (this.password.length < 6) {
      alert('❌ La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // ✅ Validar que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      alert('❌ Las contraseñas no coinciden.');
      return;
    }

    if (!this.isImageConfirmed || !this.finalImage) {
      alert('❌ Debes confirmar la imagen antes de registrarte.');
      return;
    }

    // Redimensionar la imagen antes de enviarla
    const resizedImage = await this.resizeImage(this.finalImage, 300);

    // Datos del formulario, incluyendo la imagen redimensionada
    const formData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password,
      photo: resizedImage // Imagen redimensionada
    };

    console.log("📤 Enviando datos:", formData);

    // Enviar la solicitud al backend
    this.http.post<any>('http://localhost:5000/api/auth/register', formData).subscribe(
      response => {
        alert('✅ Registro exitoso, ahora inicia sesión');
        this.router.navigate(['/login']);
      },
      error => {
        alert('❌ Error en el registro: ' + error.error.msg);
      }
    );
  }

  // Validación de email
  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}