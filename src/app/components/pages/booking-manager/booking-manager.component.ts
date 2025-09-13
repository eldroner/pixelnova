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