import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { HeroComponent } from '../../shared/hero/hero.component';
import { SpacerComponent } from '../../shared/spacer/spacer.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { TextContainerComponent } from '../../shared/text/text-container/text-container.component';
import { TitleComponent } from '../../shared/text/title/title.component';
import { SubtitleComponent } from '../../shared/text/subtitle/subtitle.component';
import { ParagraphComponent } from '../../shared/text/paragraph/paragraph.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { SeoService } from '../../../services/seo.service';
import { ImageViewerModalComponent } from '../../tools/image-viewer-modal/image-viewer-modal.component';

@Component({
  selector: 'app-booking-manager',
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
    ButtonComponent,
    ImageViewerModalComponent
  ],
  templateUrl: './booking-manager.component.html',
  styleUrls: ['./booking-manager.component.scss']
})
export class BookingManagerComponent implements OnInit {

  private isBrowser: boolean;
  showImageViewer: boolean = false;
  currentImageUrl: string | null = null;

  sidebarLeftItems = [
    { title: 'Inicio', link: '/' },
    { title: 'Desarrollo de sitios web', link: 'services/webs' },
    { title: 'Funciones para tu web', link: 'services/component' },
    { title: 'Soporte integral 24/7', link: 'services/support' },
    { title: 'Mantenimiento de sitios web', link: 'services/web-upgrade' },
    { title: 'Gestión de redes sociales', link: 'services/rrss' },
    { title: 'El Legado de los Nuestros', link: 'memorial' },
    { title: 'Contacta con Pixelnova', link: 'contact' }
  ];

  sidebarRightItems = [
    { title: 'No lo pienses, hazlo!!', link: 'https://www.entrepreneur.com/es/iniciar-un-negocio/de-la-idea-a-la-ejecucion-los-4-pasos-clave-para-el/481841' },
    { title: 'Montar un negocio en línea', link: 'https://www.entrepreneur.com/es/iniciar-un-negocio/cuatro-consejos-para-iniciar-un-negocio-en-linea-en-2024/468319' },
    { title: 'Reescribiendo las reglas del marketing', link: 'https://www.entrepreneur.com/es/marketing/asi-es-como-la-tecnologia-moderna-esta-reescribiendo/466175' },
    { title: 'Escala tu negocio así', link: 'https://www.entrepreneur.com/es/consultoria/7-estrategias-para-escalar-tu-pequeno-negocio-y-lograr-un/463442' },
    { title: 'La importancia de una estrategia de marketing ', link: 'https://www.entrepreneur.com/es/marketing/la-importancia-de-una-estrategia-de-marketing-efectiva-para/425507' },
    { title: 'El poder de ser profesionalmente crudo', link: 'https://www.entrepreneur.com/es/redes-sociales/el-poder-de-ser-profesionalmente-crudo/425451' },
    { title: '4 maneras de aprovechar la publicidad', link: 'https://www.entrepreneur.com/es/marketing/4-maneras-en-que-los-emprendedores-pueden-aprovechar-los/403265' },
    { title: 'Utiliza un asistente virtual', link: 'https://www.entrepreneur.com/es/tecnologia/3-formas-de-utilizar-un-asistente-virtual-para-aumentar-su/405076' },
    { title: 'Cumplimiento de la privacidad', link: 'https://www.entrepreneur.com/es/liderazgo/3-razones-por-las-que-su-empresa-debe-priorizar-el/408682' }
  ];

  constructor(private seoService: SeoService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.seoService.updateSeo(
      'Gestor de Reservas Online | Software de Citas para Negocios',
      'Optimiza tu negocio con nuestro gestor de reservas online. Software intuitivo para peluquerías, clínicas, restaurantes y más. Asistencia 24/7. ¡Prueba Pixelnova!',
      'gestor de reservas, software de citas, reservas online, sistema de booking, peluquerías, clínicas, restaurantes, gestión de horarios, Pixelnova, agenda online',
      'https://www.tuweb.com/services/booking-manager',
      'https://www.tuweb.com/assets/img/booking-manager/front-end-booking-manager.jpg'
    );
  }

  openImageViewer(imageUrl: string): void {
    this.currentImageUrl = imageUrl;
    this.showImageViewer = true;
  }

  closeImageViewer(): void {
    this.showImageViewer = false;
    this.currentImageUrl = null;
  }
}