import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemorialService {
  private apiUrl = 'http://localhost:5000/api/auth/memorials';  // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  // ✅ Crear un memorial
  createMemorial(memorialData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/create`, memorialData, { headers });
  }

  // ✅ Obtener memoriales del usuario autenticado
  getMemorials(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/my-memorials`, { headers });
  }

  // ✅ Añadir usuario a memorial premium
  addUserToMemorial(memorialId: string, userId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/add-user`, { memorialId, userId }, { headers });
  }
}