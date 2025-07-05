import { Component, OnInit } from '@angular/core';
import { HeroComponent } from "../../../shared/hero/hero.component";
import { SpacerComponent } from "../../../shared/spacer/spacer.component";
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { TextContainerComponent } from "../../../shared/text/text-container/text-container.component";
import { TitleComponent } from "../../../shared/text/title/title.component";
import { SubtitleComponent } from "../../../shared/text/subtitle/subtitle.component";
import { ParagraphComponent } from "../../../shared/text/paragraph/paragraph.component";
import { ButtonComponent } from "../../../shared/button/button.component";
import { SeoService } from '../../../../services/seo.service';

@Component({
  selector: 'app-publicidad-online',
  standalone: true,
  imports: [HeroComponent, SpacerComponent, SidebarComponent, TextContainerComponent, TitleComponent, SubtitleComponent, ParagraphComponent, ButtonComponent],
  templateUrl: './publicidad-online.component.html',
  styleUrl: './publicidad-online.component.scss'
})
export class PublicidadOnlineComponent implements OnInit {

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateSeo(
      'Publicidad Online y Campañas Digitales - Pixelnova',
      'Creamos y gestionamos campañas de publicidad online en Google Ads y redes sociales para maximizar tu visibilidad y atraer clientes potenciales. ¡Invierte inteligentemente!',
      'publicidad online, campañas digitales, Google Ads, publicidad en redes sociales, marketing de pago, SEM, social ads, Pixelnova',
      'https://www.tuweb.com/services/publicidad-online',
      'https://www.tuweb.com/assets/img/publicidad-online.jpg'
    );
  }
}
