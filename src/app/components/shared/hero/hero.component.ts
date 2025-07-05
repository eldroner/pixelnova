import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, ButtonComponent],
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  private _title: string = 'Potenciamos tu negocio con tecnología y creatividad';
  safeTitle: SafeHtml;

  @Input()
  set title(value: string) {
    this._title = value;
    this.safeTitle = this.sanitizer.bypassSecurityTrustHtml(value);
  }
  get title(): string {
    return this._title;
  }

  @Input() description: string = 'Webs personalizadas, marketing digital, fotografía y vídeo aéreo';
  @Input() buttonText: string = 'Trabajemos juntos';
  @Input() buttonLink: string = '/contact';
  @Input() backgroundImage: string = '';
  @Input() showButton: boolean = true;

  @Output() buttonClick = new EventEmitter<void>();

  constructor(private sanitizer: DomSanitizer) {
    this.safeTitle = this.sanitizer.bypassSecurityTrustHtml(this._title);
  }

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
