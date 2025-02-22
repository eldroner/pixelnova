import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 Asegúrate de importar esto
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MemorialService } from '../../../services/memorial.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-memorial-detail',
  standalone: true,
  imports: [CommonModule, RouterLink], // 👈 Agrégalo aquí
  templateUrl: './memorial-detail.component.html',
  styleUrls: ['./memorial-detail.component.scss']
})
export class MemorialDetailComponent implements OnInit {
  memorial: any = null;
  safeVideoUrl: SafeResourceUrl | null = null;
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private memorialService: MemorialService,
    private sanitizer: DomSanitizer
  ) {}

  

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    const memorialId = this.route.snapshot.paramMap.get('id');

    if (memorialId) {
      this.memorialService.getMemorialById(memorialId).subscribe({
        next: (data) => {
          this.memorial = data;
          if (this.memorial?.videoUrl) {
            this.safeVideoUrl = this.transformYouTubeUrl(this.memorial.videoUrl);
          }
        },
        error: (err) => console.error('Error al obtener memorial:', err)
      });
    }
  }

  private transformYouTubeUrl(url: string): SafeResourceUrl {
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]+)/);
    
    if (videoIdMatch && videoIdMatch[1]) {
      const embedUrl = `https://www.youtube.com/embed/${videoIdMatch[1]}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    } else {
      console.error("URL de YouTube no válida:", url);
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}
