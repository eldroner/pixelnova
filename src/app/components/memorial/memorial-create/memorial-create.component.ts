import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Importamos FormsModule
import { CommonModule } from '@angular/common';
import { MemorialService } from '../../../services/memorial.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memorial-create',
  standalone: true, // ✅ Al ser standalone, importamos los módulos aquí
  templateUrl: './memorial-create.component.html',
  styleUrls: ['./memorial-create.component.scss'],
  imports: [CommonModule, FormsModule] // ✅ Agregamos FormsModule
})
export class MemorialCreateComponent {
  memorialData = {
    name: '',
    description: '',
    birthDate: '',
    deathDate: '',
    videoUrl: '', // ✅ Verifica que el nombre coincida con el del modelo en el backend
    publicVideo: true // ✅ Si es un campo requerido, agrégalo con un valor por defecto
  };
  
  

  token: string = '';

  constructor(private memorialService: MemorialService, private router: Router) {
    this.token = localStorage.getItem('token') || '';
  }

  createMemorial() {
    if (!this.memorialData.name.trim()) {
      alert("El nombre del memorial es obligatorio.");
      return;
    }

    this.memorialService.createMemorial(this.memorialData, this.token).subscribe(
      response => {
        console.log("✅ Memorial creado correctamente:", response);
        alert("Memorial creado con éxito");

        // 🔹 Redirigir al usuario a la lista de memoriales tras la creación
        this.router.navigate(['/memorial']);
      },
      error => {
        console.error("❌ Error al crear memorial:", error);
        alert("Hubo un error al crear el memorial.");
      }
    );
  }
}
