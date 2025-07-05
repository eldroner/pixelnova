import { Component, OnInit, inject } from '@angular/core';
import { HeroComponent } from "../../../shared/hero/hero.component";
import { SpacerComponent } from "../../../shared/spacer/spacer.component";
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { TextContainerComponent } from "../../../shared/text/text-container/text-container.component";
import { TitleComponent } from "../../../shared/text/title/title.component";
import { SubtitleComponent } from "../../../shared/text/subtitle/subtitle.component";
import { ParagraphComponent } from "../../../shared/text/paragraph/paragraph.component";
import { ButtonComponent } from "../../../shared/button/button.component";
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../../services/seo.service';

@Component({
  selector: 'app-webs',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    SpacerComponent,
    SidebarComponent,
    TextContainerComponent,
    TitleComponent,
    SubtitleComponent,
    ParagraphComponent,
    ButtonComponent
  ],
  templateUrl: './webs.component.html',
  styleUrl: './webs.component.scss'
})
export class WebsComponent implements OnInit {


  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateSeo(
      'Desarrollo Web Profesional | Diseño de Páginas Web a Medida',
      'Creamos sitios web profesionales y a medida para tu negocio. Diseño web optimizado para SEO, rápido y seguro. ¡Impulsa tu presencia online con Pixelnova!',
      'desarrollo web, diseño web, páginas web a medida, optimización SEO, creación web, webs profesionales, Pixelnova, presencia online',
      'https://www.tuweb.com/services/webs',
      'https://www.tuweb.com/assets/img/desarrollo-web.jpg'
    );
  }
  
}
