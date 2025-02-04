import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, ButtonComponent],
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  @Input() title: string = 'Potenciamos tu negocio con tecnología y creatividad';
  @Input() description: string = 'Webs personalizadas, marketing digital, fotografía y vídeo aéreo';
  @Input() buttonText: string = 'Trabajemos juntos';
  @Input() buttonLink: string = '/contact';
  @Input() backgroundImage: string = '';  // ✅ La imagen es opcional, si no se define queda en blanco.
  @Input() showButton: boolean = true;
}
