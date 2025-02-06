import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // ✅ Hace que el servicio esté disponible globalmente
})
export class YoutubeService {
  private apiKey: string = 'AIzaSyB5-uBXHKIBef2E_afopEa9IuGk9KjJy5o'; // 🔹 Sustituye con tu clave real
  private http = inject(HttpClient); // ✅ Nueva forma de inyección para Angular Standalone

  getVideos(playlistId: string, maxResults: number = 6): Observable<any> {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}

