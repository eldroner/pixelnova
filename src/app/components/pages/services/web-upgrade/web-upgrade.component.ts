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
  selector: 'app-web-upgrade',
  standalone: true,
  imports: [HeroComponent, SpacerComponent, SidebarComponent, TextContainerComponent, TitleComponent, SubtitleComponent, ParagraphComponent, ButtonComponent],
  templateUrl: './web-upgrade.component.html',
  styleUrl: './web-upgrade.component.scss'
})
export class WebUpgradeComponent implements OnInit {

  safeTitle: SafeHtml;

  constructor(private sanitizer: DomSanitizer, private seoService: SeoService) {
    const rawHtml = 'Mantenimiento y <span style="color:#007bff;">Actualizaciones</span>';
    this.safeTitle = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  }

  ngOnInit(): void {
    this.seoService.updateSeo(
      'Mantenimiento Web y Actualización | Optimización y Seguridad',
      'Asegura el rendimiento y la seguridad de tu web con nuestro servicio de mantenimiento y actualización. Copias de seguridad, optimización y soporte técnico.',
      'mantenimiento web, actualización web, optimización web, seguridad web, soporte técnico, copias de seguridad, Pixelnova, rendimiento web',
      'https://www.tuweb.com/services/web-upgrade',
      'https://www.tuweb.com/assets/img/mantenimiento-web.jpg'
    );
  }
}
