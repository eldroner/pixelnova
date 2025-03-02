import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { ImageCropModalComponent } from "../../tools/image-crop-modal/image-crop-modal.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeroComponent } from "../../shared/hero/hero.component";
import { SpacerComponent } from "../../shared/spacer/spacer.component";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  standalone: true,
  styleUrls: ['./edit-profile.component.scss'],
  imports: [ImageCropModalComponent, ReactiveFormsModule, CommonModule, HeroComponent, SpacerComponent],
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  showCropModal = false;
  imageChangedEvent: any = null;
  finalImage: string | null = null;
  isImageConfirmed = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private http: HttpClient,
    private router: Router // ✅ Agregamos Router para poder redirigir
  ) {
    this.editProfileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''], // Campo opcional
      profileImage: [''], // Campo para la imagen
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        console.log('Datos del usuario:', user); // Verifica la respuesta del backend

      // 🔍 Si la foto solo tiene el nombre del archivo, agregar la URL base
      let photoUrl = user.photo && !user.photo.startsWith('http')
        ? `${environment.apiUrl}/uploads/${user.photo}`
        : user.photo;

        this.editProfileForm.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone,
          profileImage: photoUrl, // Asegurar que la ruta es completa
        });

        this.finalImage = photoUrl; // Usar la ruta completa
        this.isImageConfirmed = !!user.photo;
      },
      error: (error) => {
        console.error('Error cargando el perfil del usuario', error);
        alert('Error cargando el perfil del usuario. Por favor, intenta nuevamente.');
      },
    });
  }


  openCropModal(event: any): void {
    if (!event.target.files.length) return;

    const file = event.target.files[0];

    if (file.size > 2 * 1024 * 1024) { // 🔹 2MB en bytes
      alert("La imagen es demasiado grande. Por favor, selecciona una de menos de 3MB.");
      return;
    }

    this.imageChangedEvent = event;
    this.showCropModal = true;
  }


  onImageCropped(croppedImage: string): void {
    this.finalImage = croppedImage;
    this.isImageConfirmed = true;
    this.showCropModal = false;
    this.editProfileForm.patchValue({ profileImage: croppedImage });
  }

  closeCropModal(): void {
    this.showCropModal = false;
  }

  async onSubmit(): Promise<void> {
    if (this.editProfileForm.valid) {
      const formData = new FormData();

      // Agregar datos básicos del usuario
      formData.append('name', this.editProfileForm.value.name);
      formData.append('email', this.editProfileForm.value.email);
      formData.append('phone', this.editProfileForm.value.phone);

      // Si hay una nueva imagen, la agregamos como archivo
      if (this.finalImage) {
        const blob = await fetch(this.finalImage).then(res => res.blob());
        formData.append('photo', blob, 'profile.jpg'); // 🔹 Agregamos la imagen como archivo
      }

      console.log('🔄 Enviando datos actualizados:', formData);

      this.userService.updateUserProfile(formData).subscribe({
        next: (response) => {
          console.log('✅ Perfil actualizado', response);
          alert('Perfil actualizado correctamente');

        // 🔄 Actualizar los datos del usuario en el servicio
        this.userService.setUserData(response.user);

        // 🔄 Recargar la imagen en el header sin recargar toda la página
        this.finalImage = response.user.photo;

        // 🔀 Redirigir al home después de cerrar el alert
        setTimeout(() => {
          this.router.navigate(['/']).then(() => {
            window.location.reload(); // 🔄 Recargar la página después de llegar al home
        });
      }, 300); // 🔹 Pequeña pausa para que se cierre el alert antes de redirigir

        },
        error: (error) => {
          console.error('❌ Error actualizando perfil', error);
          alert('Error al actualizar el perfil');
        },
      });
    }
  }


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

      img.onerror = (error) => reject(error);
    });
  }
}