import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paragraph',
  standalone: true,
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent {
  @Input() text: string = '';  
  @Input() padding: boolean = true;
}
