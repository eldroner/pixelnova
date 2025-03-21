import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photo?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable(); // 🔹 Permite actualizar la UI sin recargar

  constructor() {
    const storedUser = this.getUser();
    if (storedUser) {
      this.userSubject.next(storedUser);
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser(): User | null {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) return null;

      let user: User = JSON.parse(userData);

      if (user.photo && !user.photo.startsWith('http')) {
        user.photo = `${environment.apiUrl}/uploads/${user.photo}`;
      }

      return user;
    } catch (error) {
      console.error("❌ Error al obtener el usuario desde localStorage:", error);
      return null;
    }
  }

  saveUser(token: string, user: User) {
    if (user.photo && !user.photo.startsWith('http')) {
      user.photo = `${environment.apiUrl}/uploads/${user.photo}`;
    }

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}
