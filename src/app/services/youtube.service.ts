import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root' // ✅ Hace que el servicio esté disponible globalmente
})
export class YoutubeService {
  private apiKey: string = environment.youtubeApiKey;
  private http = inject(HttpClient); // ✅ Nueva forma de inyección para Angular Standalone

  getVideos(playlistId: string, maxResults: number = 6): Observable<any> {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}

