import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true, // ✅ Componente standalone
  imports: [CommonModule], // ✅ Necesario para *ngFor y otras directivas
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() title: string = '';
  @Input() items: { title: string; link: string }[] = [];
}
