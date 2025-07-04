import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  user$ = this.userSubject.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const storedUser = this.getUser();
      if (storedUser) {
        this.userSubject.next(storedUser);
      }
    }
  }

  isLoggedIn(): boolean {
    if (this.isBrowser) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getUser(): User | null {
    if (this.isBrowser) {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) return null;

        let user: User = JSON.parse(userData);

        if (user.photo && !user.photo.startsWith('http')) {
          user.photo = `${environment.apiUrl}/uploads/${user.photo}`;
        }

        return user;
      } catch (error) {
        console.error('❌ Error al obtener el usuario desde localStorage:', error);
        return null;
      }
    }
    return null;
  }

  saveUser(token: string, user: User) {
    if (this.isBrowser) {
      if (user.photo && !user.photo.startsWith('http')) {
        user.photo = `${environment.apiUrl}/uploads/${user.photo}`;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
    }
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.userSubject.next(null);
    }
  }
}
