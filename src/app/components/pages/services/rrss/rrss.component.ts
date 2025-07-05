import { Component, OnInit } from '@angular/core';
import { HeroComponent } from "../../../shared/hero/hero.component";
import { SpacerComponent } from "../../../shared/spacer/spacer.component";
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { TextContainerComponent } from "../../../shared/text/text-container/text-container.component";
import { TitleComponent } from "../../../shared/text/title/title.component";
import { SubtitleComponent } from "../../../shared/text/subtitle/subtitle.component";
import { ParagraphComponent } from "../../../shared/text/paragraph/paragraph.component";
import { ButtonComponent } from "../../../shared/button/button.component";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SeoService } from '../../../../services/seo.service';

@Component({
  selector: 'app-rrss',
  standalone: true,
  imports: [HeroComponent, SpacerComponent, SidebarComponent, TextContainerComponent, TitleComponent, SubtitleComponent, ParagraphComponent, ButtonComponent],
  templateUrl: './rrss.component.html',
  styleUrl: './rrss.component.scss'
})
export class RrssComponent implements OnInit {

  safeTitle: SafeHtml;

  constructor(private sanitizer: DomSanitizer, private seoService: SeoService) {
    const rawHtml = 'Gestión de <span style="color:#007bff;">Redes Sociales</span>';
    this.safeTitle = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  }

  ngOnInit(): void {
    this.seoService.updateSeo(
      'Gestión de Redes Sociales | Estrategias de Social Media',
      'Potencia tu marca con nuestra gestión profesional de redes sociales. Estrategias personalizadas, contenido optimizado y análisis de resultados para tu negocio.',
      'gestión de redes sociales, marketing digital, social media marketing, community manager, estrategias digitales, Pixelnova, engagement, branding',
      'https://www.tuweb.com/services/rrss',
      'https://www.tuweb.com/assets/img/gestion-redes-sociales.jpg'
    );
  }
}
