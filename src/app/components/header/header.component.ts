import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // ✅ Importamos AuthService
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  user: { name: string; photo?: string | null } | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    
    // 🔹 Suscribirse a cambios en el usuario (actualización en tiempo real)
    this.authService.user$.subscribe(userData => {
      this.user = userData;
      console.log("🟢 Usuario actualizado en Header:", this.user);
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.user = null;
    this.router.navigate(['/']); // Redirigir al inicio después de cerrar sesión
  }

  closeNavbar() {
    const navbar = document.getElementById('navbarNav');
    if (navbar) {
      navbar.classList.remove('show'); // Cierra el menú en móviles
    }
  }
}
