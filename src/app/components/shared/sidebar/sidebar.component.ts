import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() title: string = '';
  @Input() name: string = '';
  items: { title: string; link: string }[] = [];

  ngOnInit(): void {
    if (this.name === 'interes') {
      this.title = 'Enlaces de interés';
      this.items = [
        { title: 'Diseño Web', link: '/services/webs' },
        { title: 'Posicionamiento SEO', link: '/services/seo' },
        { title: 'Gestión de Redes', link: '/services/rrss' },
        { title: 'Nuestro Portfolio', link: '/portfolio' },
        { title: 'Memoriales Digitales', link: '/memorial' },
        { title: 'Playlist Vídeos Aéreos', link: 'https://www.youtube.com/playlist?list=PL-k3tQjI-a_q_6_x_w_x_w_x_w_x_w' },
        { title: 'Contacto', link: '/contact' }
      ];
    } else if (this.name === 'ayuda') {
      this.title = '¿Te ayudamos con algo?';
      this.items = [
        { title: 'Quiero una web', link: '/services/webs' },
        { title: 'Mejorar mi SEO', link: '/services/seo' },
        { title: 'Contratar soporte', link: '/services/support' },
        { title: 'Llamar ahora', link: 'tel:622053976' },
        { title: 'Pedir presupuesto', link: '/contact' }
      ];
    }
  }
}
