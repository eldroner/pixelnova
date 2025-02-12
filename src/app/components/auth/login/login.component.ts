import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Importar FormsModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // ✅ Agregar FormsModule aquí
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post<any>('http://localhost:5000/api/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe(response => {
      localStorage.setItem('token', response.token);
      alert('Login exitoso');
      this.router.navigate(['/dashboard']); // Cambia esto por la ruta a la que quieres redirigir
    }, error => {
      alert('Error en el login: ' + error.error.msg);
    });
  }
}
