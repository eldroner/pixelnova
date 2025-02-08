import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from '../../../../../../components/shared/weatherform/weatherform.component'; // Importa el componente

@Component({
  selector: 'app-turismo',
  standalone: true,
  imports: [CommonModule, WeatherComponent], // Añade WeatherComponent a los imports
  templateUrl: './turismo.component.html',
  styleUrls: ['./turismo.component.scss'], // Asegúrate de que la ruta sea correcta
})
export class TurismoComponent {
  // Lógica del componente
}