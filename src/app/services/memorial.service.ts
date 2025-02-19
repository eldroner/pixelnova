import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemorialService {
  private apiUrl = 'http://localhost:5000/api/memorials'; // ✅ Ahora usa la nueva API


  constructor(private http: HttpClient) {}

  // ✅ Crear un memorial
  createMemorial(memorialData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/create`, memorialData, { headers }); // ✅ Ahora tiene /api/memorials/
  }

  // ✅ Obtener memoriales del usuario autenticado
  getMemorials(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/my-memorials`, { headers }); // ✅ Ahora tiene /api/memorials/
  }

  // ✅ Añadir usuario a memorial premium
  addUserToMemorial(memorialId: string, userId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/add-user`, { memorialId, userId }, { headers }); // ✅ Ahora tiene /api/memorials/
  }
}
