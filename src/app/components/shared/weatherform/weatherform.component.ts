import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AemetService } from '../../../services/aemet.service';
import { WeatherData } from '../../../models/weather-data.model';

// 📌 Interfaz para municipios
interface Municipio {
  codigo: string;
  nombre: string;
  provincia: string;
}

@Component({
  selector: 'app-aemet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weatherform.component.html',
  styleUrls: ['./weatherform.component.scss'],
})
export class WeatherComponent implements OnInit {
  municipios: Municipio[] = [];
  municipiosFiltrados: Municipio[] = [];
  municipioSeleccionado: Municipio | null = null;
  municipioNombre: string = '';  // 🔹 Nueva variable para enlazar con el input
  municipio: string = '';  // 🔹 Código del municipio a enviar a la API
  fecha: string = '';
  weatherData: WeatherData[] | null = null;
  filteredWeatherData: any;
  errorMessage: string = '';

  constructor(private aemetService: AemetService) {}

ngOnInit() {
  this.aemetService.getMunicipios().subscribe(
    (data) => {
      console.log('✅ Municipios obtenidos:', data); // Depura los datos recibidos
      this.municipios = data.map(m => ({
        codigo: m.codigo,
        nombre: `${m.nombre} (${m.provincia})`, // Asegúrate de que "provincia" esté presente
        provincia: m.provincia
      }));
      this.municipiosFiltrados = [];
    },
    (error) => console.error('❌ Error obteniendo municipios:', error)
  );
}

  filtrarMunicipios(event: any) {
    const texto = event.target.value.toLowerCase();
    this.municipiosFiltrados = this.municipios.filter(m =>
      m.nombre.toLowerCase().includes(texto)
    );
  }

  seleccionarMunicipio(municipio: Municipio) {
    this.municipioSeleccionado = municipio;
    this.municipioNombre = municipio.nombre;
    this.municipio = municipio.codigo.replace(/\D/g, ''); // 🔹 Elimina "id" del código
    this.municipiosFiltrados = [];
  }
  

  onSubmit() {
    if (this.municipio) {
      this.errorMessage = '';
      this.aemetService.getWeatherByMunicipio(this.municipio).subscribe({
        next: (data) => {
          console.log('🌦️ Datos recibidos:', data);
          this.weatherData = Array.isArray(data) ? data : [data];
          this.filterWeatherData();
        },
        error: (error) => {
          console.error('⚠️ Error al obtener el pronóstico:', error);
          this.errorMessage = '❌ Error al obtener los datos. Verifica el municipio.';
        }
      });
    }
  }

  filterWeatherData() {
    console.log('🔍 Filtrando datos por fecha:', this.fecha);
  
    if (this.weatherData && this.weatherData.length > 0) {
      const firstItem = this.weatherData[0]; 
      console.log('✅ Primer elemento del array:', firstItem);
  
      if (firstItem.prediccion && firstItem.prediccion.dia) {
        console.log('📌 prediccion.dia:', firstItem.prediccion.dia);
  
        const selectedDate = new Date(this.fecha).toISOString().split('T')[0];
        console.log('📅 Fecha seleccionada (formateada):', selectedDate);
  
        this.filteredWeatherData = firstItem.prediccion.dia.filter((item: any) => {
          const itemDate = item.fecha.split('T')[0]; // ✅ Extraemos solo la parte de la fecha (sin hora)
          console.log('📆 Comparando con fecha del ítem:', itemDate);
          return itemDate === selectedDate;
        });
  
        console.log('📌 Datos filtrados:', this.filteredWeatherData);
  
        if (this.filteredWeatherData.length === 0) {
          this.errorMessage = '⚠️ No hay datos disponibles para la fecha seleccionada.';
        }
      } else {
        console.error('❌ La propiedad "prediccion" o "dia" no está presente.');
        this.errorMessage = '⚠️ Datos no disponibles.';
      }
    } else {
      console.error('⚠️ weatherData es un array vacío o no está definido.');
      this.errorMessage = '⚠️ Datos no disponibles.';
    }
  }
  
  
  
}
