import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiUrl = `${environment.apiUrl}/api/youtube`; // ✅ Apunta a nuestro backend
  private http = inject(HttpClient);

  getVideos(playlistId: string, maxResults: number = 6): Observable<any> {
    // ✅ Llama al endpoint del backend en lugar de a la API de YouTube directamente
    const url = `${this.apiUrl}/playlist/${playlistId}?maxResults=${maxResults}`;
    return this.http.get<any>(url);
  }
}

