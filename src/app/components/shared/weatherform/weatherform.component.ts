import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AemetService } from '../../../services/aemet.service';
import { WeatherData } from '../../../models/weather-data.model'; // Importa la interfaz

@Component({
  selector: 'app-aemet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weatherform.component.html',
  styleUrls: ['./weatherform.component.scss'],
})
export class WeatherComponent implements OnInit {
  municipio: string = ''; // Código del municipio
  fecha: string = '';
  weatherData: WeatherData[] | null = null; // Ahora es un array de WeatherData
  filteredWeatherData: any; // Datos filtrados por fecha
  errorMessage: string = ''; // Mensaje de error

  constructor(private aemetService: AemetService) {}

  ngOnInit() {
    // Puedes inicializar algún valor por defecto si lo deseas
  }

  onSubmit() {
    if (this.municipio) {
      this.errorMessage = ''; // Limpia el mensaje de error al hacer una nueva consulta
      this.aemetService.getWeatherByMunicipio(this.municipio).subscribe({
        next: (data) => {
          console.log('Datos recibidos:', data); // Depuración
  
          // Si el backend devuelve un solo objeto, conviértelo en un array
          this.weatherData = Array.isArray(data) ? data : [data];
  
          console.log('Datos asignados a weatherData:', this.weatherData); // Depuración
          this.filterWeatherData(); // Filtra los datos después de recibirlos
        },
        error: (error) => {
          console.error('Error al obtener el pronóstico:', error); // Depuración
          this.errorMessage = 'Error al obtener los datos. Verifica el código del municipio.'; // Asigna un mensaje de error
        }
      });
    }
  }

  filterWeatherData() {
    console.log('Filtrando datos por fecha:', this.fecha); // Depuración

    if (this.weatherData && this.weatherData.length > 0) {
      const firstItem = this.weatherData[0]; // Accede al primer elemento del array
      console.log('Primer elemento del array:', firstItem); // Depuración

      if (firstItem.prediccion && firstItem.prediccion.dia) {
        console.log('prediccion.dia:', firstItem.prediccion.dia); // Depuración

        const selectedDate = new Date(this.fecha).toISOString().split('T')[0];
        console.log('Fecha seleccionada (formateada):', selectedDate); // Depuración

        this.filteredWeatherData = firstItem.prediccion.dia.filter((item: any) => {
          const itemDate = new Date(item.fecha).toISOString().split('T')[0];
          console.log('Fecha del ítem:', itemDate); // Depuración
          return itemDate === selectedDate;
        });

        if (this.filteredWeatherData.length === 0) {
          this.errorMessage = 'No hay datos disponibles para la fecha seleccionada.'; // Asigna un mensaje de error si no hay datos
        }
      } else {
        console.error('La propiedad "prediccion" o "dia" no está presente en el primer elemento.'); // Depuración
        this.errorMessage = 'Datos no disponibles.';
      }
    } else {
      console.error('weatherData es un array vacío o no está definido.'); // Depuración
      this.errorMessage = 'Datos no disponibles.';
    }
  }
}