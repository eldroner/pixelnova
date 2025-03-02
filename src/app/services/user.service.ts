import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api/auth`; // ✅ URL base del backend
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener el perfil del usuario
  getUserProfile(): Observable<any> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.apiUrl}/user/profile`, { headers }); // ✅ Debe ser /api/auth/user/profile
  }
  

  // Actualizar el perfil del usuario con FormData
  updateUserProfile(profileData: FormData): Observable<any> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.put(`${this.apiUrl}/user/profile`, profileData, { headers });
}


  // ✅ Establecer los datos del usuario en la aplicación
setUserData(user: any): void {
    this.userDataSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user)); // 🔹 Guarda el usuario actualizado en localStorage
}

}
