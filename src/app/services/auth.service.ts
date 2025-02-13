import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<{ name: string; photo?: string | null } | null>(null);
  user$ = this.userSubject.asObservable(); // 🔹 Permite actualizar la UI sin recargar

  constructor() {
    const storedUser = this.getUser();
    if (storedUser) {
      this.userSubject.next(storedUser); // 🔹 Emitir el usuario si ya está en localStorage
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser(): { name: string; photo?: string | null } | null {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) return null;

      let user = JSON.parse(userData);

      // ✅ Asegurar que la foto tiene la ruta correcta
      if (user.photo && !user.photo.startsWith('http')) {
        user.photo = `http://localhost:5000/uploads/${user.photo}`;
      }

      return user;
    } catch (error) {
      console.error("❌ Error al obtener el usuario desde localStorage:", error);
      return null;
    }
  }

  saveUser(token: string, user: { name: string; photo?: string }) {
    if (user.photo && !user.photo.startsWith('http')) {
      user.photo = `http://localhost:5000/uploads/${user.photo}`;
    }

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user); // 🔹 Ahora el header se actualizará en tiempo real
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null); // 🔹 Emitir `null` para actualizar el header
  }
}
