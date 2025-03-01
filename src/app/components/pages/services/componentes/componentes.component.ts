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
  selector: 'app-componentes',
  standalone: true,
  imports: [HeroComponent, SpacerComponent, TextContainerComponent, TitleComponent, SubtitleComponent, ParagraphComponent, SidebarComponent, ButtonComponent],
  templateUrl: './componentes.component.html',
  styleUrl: './componentes.component.scss'
})
export class ComponentesComponent implements OnInit {

  safeTitle: SafeHtml;

  constructor(private sanitizer: DomSanitizer, private seoService: SeoService) {
    const rawHtml = 'Componentes y <span style="color:#007bff;">Funcionalidades Extras</span>';
    this.safeTitle = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  }

  ngOnInit(): void {
    this.seoService.updateSeo(
      'Componentes y Funcionalidades Extras - Pixelnova',
      'Añade nuevas funcionalidades a tu web con módulos personalizados. Desde sistemas de reservas hasta calculadoras interactivas, mejoramos tu sitio web con las herramientas que necesitas.',
      'componentes web, funcionalidades extra, módulos web, sistemas de reservas, calculadoras interactivas, mejoras web, personalización web, Pixelnova',
      'https://www.tuweb.com/services/component',
      'https://www.tuweb.com/assets/img/componentes-web.jpg'
    );
  }
}
