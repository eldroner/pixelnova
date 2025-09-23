import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { environment } from '../../../../../environments/environment'; // Import environment

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

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {} // Inject HttpClient

  scrollToForm() {
    if (isPlatformBrowser(this.platformId)) {
      const formElement = document.getElementById('form-seo');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  sendEmail() {
    this.http.post<any>(`${environment.apiUrl}/api/email/send-contact`, this.form)
      .subscribe({
        next: () => {
          alert('✅ Mensaje enviado con éxito.');
          this.form = { name: '', email: '', phone: '', message: '' }; // Resetear formulario
        },
        error: (err) => {
          console.error('❌ Error al enviar el mensaje:', err);
          alert('❌ Hubo un problema al enviar el mensaje. Inténtalo de nuevo.');
        }
      });
  }
}