import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();
  private isBrowser: boolean;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getUserProfile(): Observable<any> {
    if (!this.isBrowser) {
      return new Observable(observer => {
        observer.error('localStorage is not available on the server');
      });
    }
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.apiUrl}/user/profile`, { headers });
  }

  updateUserProfile(profileData: FormData): Observable<any> {
    if (!this.isBrowser) {
      return new Observable(observer => {
        observer.error('localStorage is not available on the server');
      });
    }
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.put(`${this.apiUrl}/user/profile`, profileData, { headers });
  }

  setUserData(user: any): void {
    if (this.isBrowser) {
      this.userDataSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
}
