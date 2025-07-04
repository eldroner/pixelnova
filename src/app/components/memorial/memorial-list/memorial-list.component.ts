import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
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
  private isBrowser: boolean;

  private ADMIN_ID = '67b8cc936d35dd0405bfaa3e';

  constructor(
    private memorialService: MemorialService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
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
          error: (err) => console.error('❌ Error al obtener memoriales:', err)
        });
      }
    }
  }

  searchUsers(): void {
    const trimmedQuery = this.userSearch.trim();

    if (trimmedQuery.length < 2) {
      this.searchResults = [];
      return;
    }

    this.memorialService.searchUsers(trimmedQuery, this.token).subscribe({
      next: (results) => {
        this.searchResults = results;
      },
      error: (err) => {
        console.error('❌ Error al buscar usuarios:', err);
        this.searchResults = [];
      }
    });
  }

  selectUser(user: any): void {
    this.assignUserId = user._id;
    this.userSearch = `${user.name} (${user.email})`;
    this.searchResults = [];
    console.log('🟢 Usuario seleccionado:', this.assignUserId);
  }

  closeModal(): void {
    if (this.isBrowser) {
      const modalElement = document.getElementById('assignModal');

      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }

        setTimeout(() => {
          document.body.classList.remove('modal-open');
          document.body.style.overflow = '';
          document.body.style.paddingRight = '';

          const backdrops = document.querySelectorAll('.modal-backdrop');
          backdrops.forEach((el) => el.remove());

          modalElement.classList.remove('show');
          modalElement.style.display = 'none';
          modalElement.removeAttribute('aria-modal');
          modalElement.setAttribute('aria-hidden', 'true');
        }, 300);
      }
    }
  }

  openAssignModal(memorial: any): void {
    if (this.isBrowser) {
      this.selectedMemorial = memorial;
      this.assignUserId = '';

      const modalElement = document.getElementById('assignModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  assignMemorial(): void {
    if (!this.assignUserId || this.assignUserId.trim() === '') {
      alert('⚠️ Debes ingresar un ID de usuario válido.');
      return;
    }

    console.log('📤 Asignando memorial a:', this.assignUserId);

    this.memorialService.assignMemorialToUser(this.selectedMemorial._id, this.assignUserId, this.token)
      .subscribe({
        next: () => {
          alert('✅ Memorial asignado correctamente.');
          this.selectedMemorial = null;
          this.assignUserId = '';
          this.userSearch = '';
          this.searchResults = [];
          this.closeModal();
        },
        error: (err) => {
          console.error('❌ Error al asignar memorial:', err);
          alert('❌ Ocurrió un error al asignar el memorial.');
        }
      });
  }
}
