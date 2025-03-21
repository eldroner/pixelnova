import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MemorialService } from '../../../services/memorial.service';
import { AuthService, User } from '../../../services/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-memorial-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './memorial-list.component.html',
  styleUrls: ['./memorial-list.component.scss']
})
export class MemorialListComponent implements OnInit {
  memorials: any[] = [];
  token: string = '';
  selectedMemorial: any = null;
  assignUserId: string = '';
  isAdmin: boolean = false;
  userSearch: string = '';
searchResults: any[] = [];
isSearching: boolean = false;

  private ADMIN_ID = '67b8cc936d35dd0405bfaa3e'; // 🟢 Tu ID como admin

  constructor(
    private memorialService: MemorialService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';

    const user = this.authService.getUser();
    if (user && user.id === this.ADMIN_ID) {
      this.isAdmin = true;
    }

    if (this.token) {
      this.memorialService.getMemorials(this.token).subscribe({
        next: (data) => {
          this.memorials = data;
        },
        error: (err) => console.error("❌ Error al obtener memoriales:", err)
      });
    }
  }

  searchUsers(): void {
    const trimmedQuery = this.userSearch.trim();
  
    if (trimmedQuery.length < 2) {
      this.searchResults = []; // ✅ Limpiar resultados si la consulta es muy corta
      return;
    }
  
    this.memorialService.searchUsers(trimmedQuery, this.token).subscribe({
      next: (results) => {
        this.searchResults = results;
      },
      error: (err) => {
        console.error("❌ Error al buscar usuarios:", err);
        this.searchResults = [];
      }
    });
  }
  
  
  selectUser(user: any): void {
    this.assignUserId = user._id;  // ✅ Guardamos el ID del usuario
    this.userSearch = `${user.name} (${user.email})`;  // ✅ Mostramos nombre + email en el input
    this.searchResults = [];  // 🔄 Limpiamos la lista de resultados después de la selección
    console.log("🟢 Usuario seleccionado:", this.assignUserId);  // 🔍 Verificar en la consola
  }
  
  
  

  closeModal(): void {
    const modalElement = document.getElementById('assignModal');
  
    // 🔴 Oculta el modal con Bootstrap si tiene instancia
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
  
      // 🧹 Limpieza total del DOM tras pequeño delay
      setTimeout(() => {
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        
        // Borra backdrop manualmente
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach((el) => el.remove());
  
        // Oculta el modal si quedó visible
        modalElement.classList.remove('show');
        modalElement.style.display = 'none';
        modalElement.removeAttribute('aria-modal');
        modalElement.setAttribute('aria-hidden', 'true');
      }, 300);
    }
  }
  
  
  
  
  


  openAssignModal(memorial: any): void {
    this.selectedMemorial = memorial;
    this.assignUserId = '';

    const modalElement = document.getElementById('assignModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  assignMemorial(): void {
    if (!this.assignUserId || this.assignUserId.trim() === '') {
      alert('⚠️ Debes ingresar un ID de usuario válido.');
      return;
    }
  
    console.log("📤 Asignando memorial a:", this.assignUserId);  // 🔍 Verifica que se envía el ID correcto
  
    this.memorialService.assignMemorialToUser(this.selectedMemorial._id, this.assignUserId, this.token)
      .subscribe({
        next: () => {
          alert('✅ Memorial asignado correctamente.');
          this.selectedMemorial = null;
          this.assignUserId = '';
          this.userSearch = '';  // 🔄 Limpiamos el campo de búsqueda
          this.searchResults = [];  // 🔄 Limpiamos resultados
          this.closeModal();
        },
        error: (err) => {
          console.error("❌ Error al asignar memorial:", err);
          alert('❌ Ocurrió un error al asignar el memorial.');
        }
      });
  }
  
  
  
}