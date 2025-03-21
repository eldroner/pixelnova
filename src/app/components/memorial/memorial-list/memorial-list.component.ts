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

  public closeModal(): void {
    const modalElement = document.getElementById('assignModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
  
      // 🧽 Eliminar cualquier backdrop huérfano
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
  
      // 🔄 Restaurar estado
      this.selectedMemorial = null;
      this.assignUserId = '';
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
  
    this.memorialService.assignMemorialToUser(this.selectedMemorial._id, this.assignUserId.trim(), this.token)
      .subscribe({
        next: () => {
          alert('✅ Memorial asignado correctamente.');
          this.closeModal();
        },
        error: (err) => {
          console.error("❌ Error al asignar memorial:", err);
  
          if (err.status === 400) {
            alert('⚠️ El ID ingresado no tiene un formato válido.');
          } else if (err.status === 404) {
            alert('⚠️ No se encontró el usuario con ese ID.');
          } else {
            alert('❌ Ocurrió un error al asignar el memorial.');
          }
        }
      });
  }
  
  
}