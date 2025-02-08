import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AemetService {
  private backendUrl = 'http://localhost:3000'; // URL de tu backend

  constructor(private http: HttpClient) {}

  getWeatherByMunicipio(codigoMunicipio: string): Observable<any> {
    const url = `${this.backendUrl}/api/weather/${codigoMunicipio}`;
    return this.http.get(url);
  }
}