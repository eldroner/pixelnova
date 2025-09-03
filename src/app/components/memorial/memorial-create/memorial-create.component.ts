import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MemorialService } from '../../../services/memorial.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memorial-create',
  standalone: true,
  templateUrl: './memorial-create.component.html',
  styleUrls: ['./memorial-create.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class MemorialCreateComponent {
  memorial: any = {
    name: '',
    description: '',
    birthDate: '',
    deathDate: '',
    videoUrl: '',
    publicVideo: true
  };

  token: string = '';
  private isBrowser: boolean;

  constructor(private memorialService: MemorialService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.token = localStorage.getItem('token') || '';
    }
  }

  createMemorial(): void {
    const formattedMemorialData = {
      ...this.memorial,
      birthDate: this.memorial.birthDate ? new Date(this.memorial.birthDate).toISOString() : null,
      deathDate: this.memorial.deathDate ? new Date(this.memorial.deathDate).toISOString() : null
    };

    console.log('📤 Datos enviados desde Angular:', formattedMemorialData);

    this.memorialService.createMemorial(formattedMemorialData, this.token).subscribe({
      next: (response) => {
        console.log('✅ Memorial creado correctamente:', response);
        if (this.isBrowser) {
          alert('Memorial creado con éxito');
        }
        this.router.navigate(['/memorial']);
      },
      error: (err) => {
        console.error('❌ Error al crear memorial:', err);
        if (this.isBrowser) {
          alert('Hubo un error al crear el memorial.');
        }
      }
    });
  }
}
