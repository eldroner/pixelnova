import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spacer',
  standalone: true,
  template: `<div [style.height]="height" [style.margin]="margin" [style.backgroundColor]="bgColor"></div>`,
  styleUrls: ['./spacer.component.scss']
})
export class SpacerComponent {
  @Input() height: string = '20px'; // Altura del espaciador
  @Input() margin: string = '10px 0'; // Márgenes superior e inferior
  @Input() bgColor: string = 'transparent'; // Color de fondo (opcional)
}
