import { Component, OnInit } from '@angular/core';
import { HeroComponent } from "../../shared/hero/hero.component";
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { ServiceListComponent } from "../../shared/service-list/service-list.component";
import { SpacerComponent } from "../../shared/spacer/spacer.component";
import { SeoService } from '../../../services/seo.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, SidebarComponent, ServiceListComponent, SpacerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent { 

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateSeo(
      'Agencia de Marketing Digital y Diseño Web | Pixelnova',
      'Soluciones digitales integrales para empresas: diseño web, SEO, marketing digital, redes sociales y soporte técnico. Impulsa tu negocio con Pixelnova.',
      'marketing digital, diseño web, SEO, redes sociales, desarrollo web, Pixelnova, soluciones digitales, estrategia digital',
      'https://www.tuweb.com',
      'https://www.tuweb.com/assets/img/home-banner.jpg'
    );
  }

}