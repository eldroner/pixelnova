import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],  // Importar RouterLink y RouterLinkActive
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  closeNavbar() {
    const navbar = document.getElementById('navbarNav');
    if (navbar) {
      navbar.classList.remove('show'); // Cierra el menú en móviles
    }
  }
}

