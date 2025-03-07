import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text: string = 'Click aquí';
  @Input() link?: string;
  @Input() color: string = 'primary'; // 'primary', 'secondary', etc.

  @Output() buttonClick = new EventEmitter<void>();  // ✅ Agregado para manejar eventos de clic

  onButtonClick() {
    this.buttonClick.emit();  // ✅ Ahora sí podemos emitir el evento
  }
}
