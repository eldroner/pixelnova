import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { MemorialService } from '../../../services/memorial.service';

@Component({
  selector: 'app-memorial-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink], // 👈 Importamos RouterLink
  templateUrl: './memorial-list.component.html',
  styleUrls: ['./memorial-list.component.scss']
})
export class MemorialListComponent implements OnInit {
  memorials: any[] = [];
  token: string = '';

  constructor(private memorialService: MemorialService) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || ''; // Recuperamos el token del usuario

    if (this.token) {
      this.memorialService.getMemorials(this.token).subscribe({
        next: (data) => {
          this.memorials = data;
          console.log("📜 Lista de memoriales recibida:", this.memorials); // 👀 Verifica los datos
        },
        error: (err) => console.error("❌ Error al obtener memoriales:", err)
      });
      
    }
  }
}
