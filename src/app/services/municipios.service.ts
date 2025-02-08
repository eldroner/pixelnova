import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // El servicio está disponible en toda la aplicación
})
export class MunicipiosService {
  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ4anJhcHhAZ21haWwuY29tIiwianRpIjoiMTcxNjEyOGItM2NkMS00YjlhLWI5NjktZDQzODMxYjg5YjQ2IiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2NzU2MDEzMDMsInVzZXJJZCI6IjE3MTYxMjhiLTNjZDEtNGI5YS1iOTY5LWQ0MzgzMWI4OWI0NiIsInJvbGUiOiIifQ.k0x9qYjWEc0gGqrPj1oCeWY3DgiQRxBwrKw0pHTtbpk'; // Reemplaza con tu API Key de AEMET
  private apiUrl = 'https://opendata.aemet.es/opendata/api/maestro/municipios';

  constructor(private http: HttpClient) {}

  getMunicipios(): Observable<any> {
    const headers = { api_key: this.apiKey };
    return this.http.get(this.apiUrl, { headers });
  }
}