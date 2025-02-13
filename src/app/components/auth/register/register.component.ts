import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink], // ✅ Agregamos FormsModule
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name = '';
  email = '';
  phone = '';
  password = '';
  selectedFile: File | null = null; // 🔹 Variable para almacenar la foto seleccionada

  constructor(private http: HttpClient, private router: Router) {}

  // ✅ Captura la foto seleccionada por el usuario
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // ✅ Modifica la función para enviar la foto junto con los datos del usuario
  onRegister() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('phone', this.phone);
    formData.append('password', this.password);

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile); // ✅ Adjunta la foto si existe
    }

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
}
