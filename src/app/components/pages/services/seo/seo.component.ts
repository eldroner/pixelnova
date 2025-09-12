import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

import { HeroComponent } from "../../../shared/hero/hero.component";
import { SpacerComponent } from "../../../shared/spacer/spacer.component";
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { TextContainerComponent } from "../../../shared/text/text-container/text-container.component";
import { TitleComponent } from "../../../shared/text/title/title.component";
import { SubtitleComponent } from "../../../shared/text/subtitle/subtitle.component";
import { ParagraphComponent } from "../../../shared/text/paragraph/paragraph.component";
import { ButtonComponent } from "../../../shared/button/button.component";

@Component({
  selector: 'app-seo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeroComponent, 
    SpacerComponent, 
    SidebarComponent, 
    TextContainerComponent, 
    TitleComponent, 
    SubtitleComponent, 
    ParagraphComponent, 
    ButtonComponent
  ],
  templateUrl: './seo.component.html',
  styleUrl: './seo.component.scss'
})
export class SeoComponent {

  form = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  scrollToForm() {
    if (isPlatformBrowser(this.platformId)) {
      const formElement = document.getElementById('form-seo');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  sendEmail() {
    // TODO: Reemplazar 'template_otwkf2m' con el ID de la nueva plantilla de EmailJS para SEO.
    const serviceID = 'service_8ye06ka'; // Este ID suele ser el mismo para todo el servicio.
    const templateID = 'template_6l473l5'; // ¡IMPORTANTE! Cambiar por el template que envía a seo@pixelnova.es
    const publicKey = 'pkQl3ciKlncnQMXk3'; // Esta es tu clave pública.

    emailjs.send(serviceID, templateID, this.form, publicKey)
      .then(() => {
        alert('✅ Mensaje enviado con éxito.');
        this.form = { name: '', email: '', phone: '', message: '' }; // Resetear formulario
      })
      .catch((err) => {
        console.error('❌ Error al enviar el mensaje:', err);
        alert('❌ Hubo un problema al enviar el mensaje. Inténtalo de nuevo.');
      });
  }
}