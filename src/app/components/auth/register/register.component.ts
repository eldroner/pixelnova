import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Importar FormsModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule], // ✅ Agregar FormsModule aquí
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name = '';
  email = '';
  phone = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    this.http.post<any>('http://localhost:5000/api/auth/register', {
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password
    }).subscribe(response => {
      alert('Registro exitoso, ahora inicia sesión');
      this.router.navigate(['/login']);
    }, error => {
      alert('Error en el registro: ' + error.error.msg);
    });
  }
}
