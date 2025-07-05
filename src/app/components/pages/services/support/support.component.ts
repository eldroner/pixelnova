import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
  selector: 'app-support',
  standalone: true,
  imports: [HeroComponent, SpacerComponent, SidebarComponent, TextContainerComponent, TitleComponent, SubtitleComponent, ParagraphComponent, ButtonComponent],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent implements OnInit {

  safeTitle: SafeHtml;

  constructor(private sanitizer: DomSanitizer, private seoService: SeoService) {
    const rawHtml = 'Soporte <span style="color:#007bff;">Digital 24/7</span>';
    this.safeTitle = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  }

  ngOnInit(): void {
    this.seoService.updateSeo(
      'Soporte Web 24/7 | Asistencia Técnica y Mantenimiento Digital',
      'Soporte integral para tu negocio: mantenimiento web, seguridad, asistencia técnica y gestión digital. Garantizamos el funcionamiento óptimo de tu plataforma.',
      'soporte web, asistencia técnica, mantenimiento digital, seguridad online, gestión digital, Pixelnova, soporte 24/7, ayuda web',
      'https://www.tuweb.com/services/support',
      'https://www.tuweb.com/assets/img/soporte-integral.jpg'
    );
  }
}
