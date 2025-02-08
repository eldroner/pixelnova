import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AemetService } from '../../../services/aemet.service';

@Component({
  selector: 'app-aemet', // Asegúrate de que el selector sea 'app-aemet'
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './weatherform.component.html',
  styleUrls: ['./weatherform.component.scss'],
})
export class WeatherComponent implements OnInit {
  municipio: string = ''; // Código del municipio
  weatherData: any; // Datos meteorológicos

  constructor(private aemetService: AemetService) {}

  ngOnInit() {
    // Puedes inicializar algún valor por defecto si lo deseas
  }

  onSubmit() {
    if (this.municipio) {
      this.aemetService.getWeatherByMunicipio(this.municipio).subscribe(
        (data) => {
          console.log('Datos recibidos:', data); // Depuración
          this.weatherData = data; // Asigna los datos a la propiedad weatherData
        },
        (error) => {
          console.error('Error al obtener el pronóstico:', error); // Depuración
        }
      );
    }
  }
}