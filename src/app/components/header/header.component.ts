import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // ✅ Importamos AuthService
import { NgIf } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  user: { id?: string; name: string; photo?: string | null } | null = null;
  isProfileMenuOpen = false; // ✅ Variable para controlar el menú desplegable
  private myUserId = '67b8cc936d35dd0405bfaa3e'; // ✅ Tu ID de usuario
  isMenuOpen = false;  // ✅ Nueva variable para controlar si el menú está abierto o no

  constructor(private authService: AuthService, private router: Router, sanitezer: DomSanitizer) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();

    // 🔹 Suscribirse a los cambios en el usuario y actualizar la foto en el header
    this.authService.user$.subscribe(userData => {
        if (userData && 'id' in userData) {
            this.user = { 
                id: userData.id as string, 
                name: userData.name, 
                photo: userData.photo ? userData.photo : null 
            };
            console.log("🟢 Usuario actualizado en Header:", this.user);
        }
    });
  }

  isMyAccount(): boolean {
    return this.user?.id === this.myUserId;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;  // ✅ Alterna entre abierto y cerrado
  }

  toggleProfileMenu(state: boolean) {
    this.isProfileMenuOpen = state;
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
    this.isMenuOpen = false; // Asegura que la variable se reinicie
}


  toggleSubmenu(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const submenu = target.nextElementSibling as HTMLElement;

    if (submenu) {
      // Alterna la visibilidad del submenú
      submenu.classList.toggle('show');
    }
  }
}
