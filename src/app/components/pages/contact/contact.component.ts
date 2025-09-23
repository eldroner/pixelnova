import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherComponent } from "../../shared/weatherform/weatherform.component";
import { HeroComponent } from "../../shared/hero/hero.component";
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { SeoService } from '../../../services/seo.service';
import { AemetService } from '../../../services/aemet.service';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { environment } from '../../../../environments/environment'; // Import environment

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, WeatherComponent, HeroComponent, SidebarComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {
  form = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  constructor(private seoService: SeoService, private aemetService: AemetService, private http: HttpClient) {} // Inject HttpClient

  ngOnInit(): void {
    this.seoService.updateSeo(
      'Contacto Pixelnova | Desarrollo Web, SEO y Marketing Digital',
      '¿Necesitas ayuda con tu proyecto digital? Contacta con Pixelnova para servicios de desarrollo web, SEO, redes sociales y marketing digital. ¡Te esperamos!',
      'contacto, Pixelnova, desarrollo web, SEO, marketing digital, redes sociales, soporte, presupuesto web, consultoría digital',
      'https://www.tuweb.com/contact',
      'https://www.tuweb.com/assets/img/contacto.jpg'
    );
  }

  enfocarCampoMunicipio() {
    this.aemetService.enfocarCampoMunicipio();
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