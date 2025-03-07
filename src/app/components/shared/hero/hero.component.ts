import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() backgroundImage: string = '';
  @Input() showButton: boolean = true;

  @Output() buttonClick = new EventEmitter<void>();

  get shouldNavigate(): boolean {
    return !this.buttonClick.observed; // ✅ Si no hay observadores, permite la navegación
  }

  onButtonClick(event: Event) {
    console.log("🟢 Click en el botón del Hero");  // ✅ Log para depuración

    if (!this.shouldNavigate) {
      event.preventDefault();
      event.stopPropagation();
      console.log("🟢 Emitiendo evento buttonClick desde HeroComponent");
      this.buttonClick.emit();
    }
  }
}
