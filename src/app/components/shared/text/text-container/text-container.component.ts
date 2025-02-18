import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-container',
  standalone: true, // ✅ Importación corregida
  templateUrl: './text-container.component.html',
  styleUrls: ['./text-container.component.scss']
})
export class TextContainerComponent {
  @Input() align: 'left' | 'center' | 'right' = 'center';
  @Input() width: string = '100%';
  @Input() bgColor: string = 'transparent';
  @Input() border: string = 'none';
  @Input() borderRadius: string = '10px';
}
