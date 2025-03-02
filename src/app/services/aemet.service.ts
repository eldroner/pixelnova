import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';


export interface Municipio {
  codigo: string;
  nombre: string;
  provincia: string;
}

@Injectable({
  providedIn: 'root',
})
export class AemetService {
  private backendUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getWeatherByMunicipio(codigoMunicipio: string): Observable<any> {
    return this.http.get(`${this.backendUrl}/api/weather/${codigoMunicipio}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud:', error);
        return throwError(() => new Error('Error al obtener los datos del tiempo'));
      })
    );
  }

  getMunicipios(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.backendUrl}/api/municipios`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud:', error);
        return throwError(() => new Error('Error al obtener los municipios'));
      })
    );
  }
}
