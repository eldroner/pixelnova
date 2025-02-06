import { Component } from '@angular/core';
import { ServiceCardComponent } from "../service-card/service-card.component";

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [ServiceCardComponent],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss'
})
export class ServiceListComponent {

}
