import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  template: '<h1 [innerHTML]="text"></h1>',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {
  @Input() text: string = '';
}
