import { Component } from '@angular/core';
import { ButtonComponent } from "../../../../../shared/button/button.component";
import { HeroComponent } from "../../../../../shared/hero/hero.component";

@Component({
  selector: 'app-inmobiliaria',
  standalone: true,
  imports: [ButtonComponent, HeroComponent],
  templateUrl: './inmobiliaria.component.html',
  styleUrl: './inmobiliaria.component.scss'
})
export class InmobiliariaComponent {

}
