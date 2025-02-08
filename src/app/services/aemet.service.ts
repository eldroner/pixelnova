import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface WeatherData {
  origen: {
    productor: string;
    web: string;
    enlace: string;
    language: string;
    copyright: string;
    notaLegal: string;
  };
  elaborado: string;
  nombre: string;
  provincia: string;
  prediccion: {
    dia: {
      probPrecipitacion: { value: number; periodo: string }[];
      cotaNieveProv: { value: string; periodo: string }[];
      estadoCielo: { value: string; periodo: string; descripcion: string }[];
      viento: { direccion: string; velocidad: number; periodo: string }[];
      rachaMax: { value: string; periodo: string }[];
      temperatura: {
        maxima: number;
        minima: number;
        dato: { value: number; hora: number }[];
      };
      sensTermica: {
        maxima: number;
        minima: number;
        dato: { value: number; hora: number }[];
      };
      humedadRelativa: {
        maxima: number;
        minima: number;
        dato: { value: number; hora: number }[];
      };
      uvMax: number;
      fecha: string;
    }[];
  };
  id: number;
  version: number;
}

@Injectable({
  providedIn: 'root',
})
export class AemetService {
  private backendUrl = 'http://localhost:3000'; // URL de tu backend

  constructor(private http: HttpClient) {}

  getWeatherByMunicipio(codigoMunicipio: string): Observable<WeatherData> {
    const url = `${this.backendUrl}/api/weather/${codigoMunicipio}`;
    return this.http.get<WeatherData>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud:', error);
        return throwError(() => new Error('Error al obtener los datos del tiempo'));
      })
    );
  }
}