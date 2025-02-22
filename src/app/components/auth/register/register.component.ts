import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ImageCropperComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name = '';
  email = '';
  phone = '';
  password = '';
  errorMessage = '';

  // Variables para el recorte de la imagen
  imageChangedEvent: any = null;
  tempCroppedImage: string | null = null; // Imagen recortada pero NO confirmada
  finalImage: string | null = null; // Imagen confirmada
  isImageConfirmed = false; // Control de confirmación

  constructor(private http: HttpClient, private router: Router) {}

  // Detecta la imagen seleccionada
  onFileSelected(event: any) {
    if (!event.target.files.length) return; // Si no hay archivo, no hace nada
    this.imageChangedEvent = event;
    this.isImageConfirmed = false;
    this.finalImage = null;
    this.tempCroppedImage = null;

    console.log("📸 Imagen seleccionada, esperando recorte...");
  }

  // Se ejecuta cuando el usuario recorta la imagen
  imageCropped(event: ImageCroppedEvent) {
    console.log("✂ Evento completo:", event);

    if (event.blob) {
      const reader = new FileReader();
      reader.readAsDataURL(event.blob);
      reader.onloadend = () => {
        this.tempCroppedImage = reader.result as string;
        console.log("✂ Imagen recortada (pero NO confirmada todavía):", this.tempCroppedImage);
      };
    } else {
      console.warn("⚠️ No se pudo obtener la imagen recortada.");
    }
  }

  // Confirma la imagen recortada y la redimensiona
  confirmCroppedImage() {
    console.log("🔎 Intentando confirmar imagen...");
    if (!this.tempCroppedImage) {
      console.warn("⚠️ No hay imagen para confirmar.");
      alert("❌ Debes recortar y confirmar la imagen antes de continuar.");
      return;
    }

    this.resizeImage(this.tempCroppedImage, 300).then(resizedImage => {
      this.finalImage = resizedImage; // Asignamos la imagen redimensionada a finalImage
      this.isImageConfirmed = true; // Marcamos la imagen como confirmada
      console.log("✅ Imagen confirmada y redimensionada:", this.finalImage);
    });
  }

  // Permite descartar la imagen
  discardImage() {
    this.imageChangedEvent = null;
    this.tempCroppedImage = null;
    this.finalImage = null;
    this.isImageConfirmed = false;
    console.log("❌ Imagen descartada.");
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

        resolve(canvas.toDataURL('image/jpeg'));
      };

      img.onerror = error => reject(error);
    });
  }

  // Función para registrar al usuario
  onRegister() {
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

    if (!this.isImageConfirmed || !this.finalImage) {
      alert('❌ Debes confirmar la imagen antes de registrarte.');
      return;
    }

    const formData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password,
      photo: this.finalImage
    };

    console.log("📤 Enviando datos:", formData);

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