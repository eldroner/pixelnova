import { Component, OnInit } from '@angular/core';
import { HeroComponent } from "../../shared/hero/hero.component";
import { SpacerComponent } from "../../shared/spacer/spacer.component";
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { TextContainerComponent } from "../../shared/text/text-container/text-container.component";
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-memorial',
  standalone: true,
  imports: [HeroComponent, SpacerComponent, SidebarComponent, TextContainerComponent, RouterLink],
  templateUrl: './memorial.component.html',
  styleUrl: './memorial.component.scss'
})
export class MemorialComponent implements OnInit {

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateSeo(
      'Memorial Digital | Homenaje Online a Seres Queridos',
      'Crea un memorial digital para honrar y recordar a tus seres queridos. Comparte recuerdos, fotos y mensajes en un espacio online privado y seguro.',
      'memorial digital, homenaje online, recuerdos, legado, conmemoraciones, Pixelnova, espacio online, duelo',
      'https://www.tuweb.com/memorial',
      'https://www.tuweb.com/assets/img/memorial-digital.jpg'
    );
  }
}
