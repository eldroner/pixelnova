import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HeroComponent } from "../../shared/hero/hero.component";
import { SpacerComponent } from "../../shared/spacer/spacer.component"; // ✅ Importamos AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, HeroComponent, SpacerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  onLogin() {
    this.http.post<any>('http://localhost:5000/api/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe(response => {
      if (response.user) {
        this.authService.saveUser(response.token, response.user); // ✅ Ahora guardamos el usuario
      }
      alert('✅ Login exitoso');
      this.router.navigate(['/']); // Redirigir al inicio o a otra página después de login
    }, error => {
      alert('❌ Error en el login: ' + error.error.msg);
    });
  }
}
