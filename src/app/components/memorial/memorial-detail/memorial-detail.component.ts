import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { AuthService, User } from '../../../services/auth.service';

@Component({
  selector: 'app-memorial-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './memorial-detail.component.html',
  styleUrls: ['./memorial-detail.component.scss']
})
export class MemorialDetailComponent implements OnInit {
  memorial: any = null;
  memorialId: string = '';
  safeVideoUrl: SafeResourceUrl | null = null;
  user: User | null = null;
  canEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.memorialId = this.route.snapshot.paramMap.get('id') || '';
    this.user = this.authService.getUser();

    this.http.get(`${environment.apiUrl}/api/memorials/${this.memorialId}`).subscribe({
      next: (data: any) => {
        this.memorial = data;
        this.safeVideoUrl = this.transformVideoUrl(data.videoUrl);
        this.canEdit = this.user?.id === this.memorial.owner;
      },
      error: (err) => {
        console.error("❌ Error al obtener memorial:", err);
      }
    });
  }

  transformVideoUrl(url: string): SafeResourceUrl | null {
    if (!url) return null;
    const embedUrl = url.replace("watch?v=", "embed/");
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
