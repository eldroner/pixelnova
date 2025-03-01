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
      'Memoriales Digitales - Pixelnova',
      'Preserva el legado de tus seres queridos con un memorial digital. Un espacio online donde compartir recuerdos, fotos y mensajes con familiares y amigos.',
      'memorial digital, homenaje online, recuerdos familiares, legado digital, conmemoraciones, Pixelnova',
      'https://www.tuweb.com/memorial',
      'https://www.tuweb.com/assets/img/memorial-digital.jpg'
    );
  }
}
