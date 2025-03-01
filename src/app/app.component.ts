import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import { WhatsappButtonComponent } from "./components/shared/whatsapp-button/whatsapp-button.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BreadcrumbComponent, FooterComponent, WhatsappButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pixelnova';
}
