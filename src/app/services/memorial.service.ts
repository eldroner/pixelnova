import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemorialService {
  private apiUrl = `${environment.apiUrl}/api/memorials`; // ✅ Ahora usa la nueva API


  constructor(private http: HttpClient) { }

  // ✅ Crear un memorial
  createMemorial(memorialData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/create`, memorialData, { headers }); // ✅ Ahora tiene /api/memorials/
  }

  updateMemorial(memorial: any): Observable<any> {
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



  // ✅ Obtener memoriales del usuario autenticado
  getMemorials(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/my-memorials`, { headers }); // ✅ Ahora tiene /api/memorials/
  }

  getMemorialById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`); // 👈 Aquí corregimos la URL
  }

  // ✅ Asignar un memorial a otro usuario
  assignMemorialToUser(memorialId: string, userId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/assign`, { memorialId, userId }, { headers });
  }

  // ✅ Buscar usuarios por nombre o email (autocomplete)
  searchUsers(query: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${environment.apiUrl}/api/users/search?query=${query}`, { headers });
  }





  // ✅ Añadir usuario a memorial premium
  addUserToMemorial(memorialId: string, userId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/add-user`, { memorialId, userId }, { headers }); // ✅ Ahora tiene /api/memorials/
  }
}
