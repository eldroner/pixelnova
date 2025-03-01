import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() link!: string;  // 🔹 Añadir esta línea
}
