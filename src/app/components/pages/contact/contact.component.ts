import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { WeatherComponent } from "../../shared/weatherform/weatherform.component";
import { HeroComponent } from "../../shared/hero/hero.component";
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { SeoService } from '../../../services/seo.service';
import { AemetService } from '../../../services/aemet.service'; // ✅ Importamos el servicio

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

  constructor(private seoService: SeoService, private aemetService: AemetService) {} // ✅ Inyectamos AemetService

  ngOnInit(): void {
    this.seoService.updateSeo(
      'Contacto Pixelnova | Desarrollo Web, SEO y Marketing Digital',
      '¿Necesitas ayuda con tu proyecto digital? Contacta con Pixelnova para servicios de desarrollo web, SEO, redes sociales y marketing digital. ¡Te esperamos!',
      'contacto, Pixelnova, desarrollo web, SEO, marketing digital, redes sociales, soporte, presupuesto web, consultoría digital',
      'https://www.tuweb.com/contact',
      'https://www.tuweb.com/assets/img/contacto.jpg'
    );
  }

  // ✅ Ahora usamos el servicio AemetService para enfocar el input
  enfocarCampoMunicipio() {
    this.aemetService.enfocarCampoMunicipio();
  }

  sendEmail() {
    const serviceID = 'service_8ye06ka'; // Reemplaza con tu Service ID de EmailJS
    const templateID = 'template_otwkf2m'; // Reemplaza con tu Template ID de EmailJS
    const publicKey = 'pkQl3ciKlncnQMXk3'; // Reemplaza con tu Public Key de EmailJS

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