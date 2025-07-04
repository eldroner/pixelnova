import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  private isBrowser: boolean;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

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

  // ✅ Nueva función para enfocar el campo del municipio en cualquier página
  enfocarCampoMunicipio() {
    if (this.isBrowser) {
      setTimeout(() => {
        const inputMunicipio = document.querySelector<HTMLInputElement>('#municipio');
        if (inputMunicipio) {
          inputMunicipio.focus();
        } else {
          console.warn("⚠️ No se encontró el input del municipio en el DOM");
        }
      }, 500);
    }
  }
}
