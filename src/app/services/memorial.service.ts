import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemorialService {
  private apiUrl = `${environment.apiUrl}/api/memorials`;
  private isBrowser: boolean;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  createMemorial(memorialData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/create`, memorialData, { headers });
  }

  updateMemorial(memorial: any): Observable<any> {
    if (!this.isBrowser) {
      return new Observable(observer => {
        observer.error('localStorage is not available on the server');
      });
    }
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('❌ No hay token en localStorage.');
      return new Observable(observer => {
        observer.error('No hay token de autenticación.');
      });
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.apiUrl}/${memorial._id}`, memorial, { headers });
  }

  getMemorials(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/my-memorials`, { headers });
  }

  getMemorialById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  assignMemorialToUser(memorialId: string, userId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/assign`, { memorialId, userId }, { headers });
  }

  searchUsers(query: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${environment.apiUrl}/api/users/search?query=${query}`, { headers });
  }

  addUserToMemorial(memorialId: string, userId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/add-user`, { memorialId, userId }, { headers });
  }
}
