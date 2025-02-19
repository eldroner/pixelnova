import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemorialService } from '../../../services/memorial.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-memorial-detail',
  templateUrl: './memorial-detail.component.html',
  styleUrls: ['./memorial-detail.component.scss']
})
export class MemorialDetailComponent implements OnInit {
  memorial: any = null;
  safeVideoUrl: SafeResourceUrl | null = null; // ✅ URL saneada para el iframe
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private memorialService: MemorialService,
    private sanitizer: DomSanitizer // ✅ Inyectamos DomSanitizer
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    const memorialId = this.route.snapshot.paramMap.get('id');

    if (this.token && memorialId) {
      this.memorialService.getMemorials(this.token).subscribe((data) => {
        this.memorial = data.find((m: any) => m._id === memorialId);
        
        if (this.memorial?.videoUrl) {
          this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.memorial.videoUrl);
        }
      });
    }
  }
}
