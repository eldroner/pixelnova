import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { WeatherComponent } from "../../shared/weatherform/weatherform.component";
import { HeroComponent } from "../../shared/hero/hero.component";


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, WeatherComponent, HeroComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  form = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

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
