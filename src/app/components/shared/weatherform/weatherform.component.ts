import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AemetService } from '../../../services/aemet.service';
import { WeatherData } from '../../../models/weather-data.model';

declare var bootstrap: any; // Para manejar el modal de Bootstrap

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
  municipioNombre: string = '';
  municipio: string = '';
  fecha: string = '';
  weatherData: WeatherData[] | null = null;
  filteredWeatherData: any;
  errorMessage: string = '';

  constructor(private aemetService: AemetService) {}

  ngOnInit() {
    this.aemetService.getMunicipios().subscribe(
      (data) => {
        console.log('✅ Municipios obtenidos:', data);
        this.municipios = data.map(m => ({
          codigo: m.codigo,
          nombre: `${m.nombre} (${m.provincia})`,
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
    this.municipio = municipio.codigo.replace(/\D/g, '');
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
  
          // ✅ Solo abrir el modal si hay datos disponibles
          if (this.filteredWeatherData && this.filteredWeatherData.length > 0) {
            const modalElement = document.getElementById('weatherModal');
  
            if (modalElement) {
              const myModal = new bootstrap.Modal(modalElement);
              myModal.show();
  
              // ✅ AL CERRAR EL MODAL, MOVER EL FOCO AL INPUT PARA EVITAR ERROR ARIA
              modalElement.addEventListener('hidden.bs.modal', () => {
                const searchInput = document.getElementById('municipio');
                if (searchInput) {
                  searchInput.focus(); // 🔹 Mueve el foco al input de municipio
                }
              });
            } else {
              console.error('❌ No se encontró el modal en el DOM.');
            }
          } else {
            this.errorMessage = '⚠️ No hay datos disponibles para la fecha seleccionada.';
          }
        },
        error: (error) => {
          console.error('⚠️ Error al obtener el pronóstico:', error);
          this.errorMessage = '❌ Error al obtener los datos. Verifica el municipio.';
        }
      });
    }
  }

  getWeatherIcon(description?: string): string {
    if (!description) return 'https://openweathermap.org/img/wn/50d.png'; // Default
  
    const lowerDesc = description.toLowerCase();
    if (lowerDesc.includes('despejado')) return 'https://openweathermap.org/img/wn/01d.png'; // ☀️
    if (lowerDesc.includes('nuboso') || lowerDesc.includes('nublado')) return 'https://openweathermap.org/img/wn/03d.png'; // ☁️
    if (lowerDesc.includes('poco nuboso')) return 'https://openweathermap.org/img/wn/02d.png'; // 🌤️
    if (lowerDesc.includes('lluvia')) return 'https://openweathermap.org/img/wn/09d.png'; // 🌧️
    if (lowerDesc.includes('tormenta')) return 'https://openweathermap.org/img/wn/11d.png'; // ⛈️
    if (lowerDesc.includes('nieve')) return 'https://openweathermap.org/img/wn/13d.png'; // ❄️
    if (lowerDesc.includes('niebla') || lowerDesc.includes('bruma')) return 'https://openweathermap.org/img/wn/50d.png'; // 🌫️
  
    return 'https://openweathermap.org/img/wn/50d.png'; // Default
  }
  
  
  
  

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
  
  

  filterWeatherData() {
    console.log('🔍 Filtrando datos por fecha:', this.fecha);
  
    if (this.weatherData && this.weatherData.length > 0) {
      const firstItem = this.weatherData[0]; 
  
      if (firstItem.prediccion && firstItem.prediccion.dia) {
        const selectedDate = new Date(this.fecha).toISOString().split('T')[0];
  
        this.filteredWeatherData = firstItem.prediccion.dia.filter((item: any) => {
          const itemDate = item.fecha.split('T')[0];
          return itemDate === selectedDate;
        });
  
        if (this.filteredWeatherData.length === 0) {
          this.errorMessage = '⚠️ No hay datos disponibles para la fecha seleccionada.';
        } else {
          // 🔹 Extraer la velocidad del viento
          this.filteredWeatherData.forEach((item: any) => {
            item.vientoVelocidad = item.viento?.[0]?.velocidad ?? 'N/A';
            item.vientoDireccion = item.viento?.[0]?.direccion ?? 'N/A';
          });
        }
      } else {
        this.errorMessage = '⚠️ Datos no disponibles.';
      }
    } else {
      this.errorMessage = '⚠️ Datos no disponibles.';
    }
  }
  

  // 🔹 Función para formatear la fecha en DD/MM/YYYY
  formatDateToSpanish(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
