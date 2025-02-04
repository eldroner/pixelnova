import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-hero',
  imports: [ButtonComponent],
  standalone: true, // ✅ Hacemos el componente independiente
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  @Input() title: string = 'Potenciamos tu negocio con tecnología y creatividad';
  @Input() description: string = 'Webs personalizadas, marketing digital, fotografía y vídeo aéreo';
  @Input() buttonText: string = 'Trabajemos juntos';
  @Input() buttonLink: string = '/contact';
}
