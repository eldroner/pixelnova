import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private myUserId = '67b8cc936d35dd0405bfaa3e'; // ✅ Tu ID de usuario

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.authService.user$.subscribe(user => {
        // ✅ Verificamos que user exista y tenga la propiedad id antes de acceder a ella
        if (user && (user as any).id === this.myUserId) {
          observer.next(true); // ✅ Permitir acceso
        } else {
          this.router.navigate(['/']); // ❌ Redirigir si no es el usuario correcto
          observer.next(false);
        }
        observer.complete();
      });
    });
  }
}
