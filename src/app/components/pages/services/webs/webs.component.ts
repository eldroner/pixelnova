import { Component, OnInit, inject } from '@angular/core';
import { HeroComponent } from "../../../shared/hero/hero.component";
import { SpacerComponent } from "../../../shared/spacer/spacer.component";
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { TextContainerComponent } from "../../../shared/text/text-container/text-container.component";
import { TitleComponent } from "../../../shared/text/title/title.component";
import { SubtitleComponent } from "../../../shared/text/subtitle/subtitle.component";
import { ParagraphComponent } from "../../../shared/text/paragraph/paragraph.component";
import { ButtonComponent } from "../../../shared/button/button.component";
import { CommonModule } from '@angular/common';
import { YoutubeService } from '../../../../services/youtube.service'; // 📌 Importa el servicio de YouTube

@Component({
  selector: 'app-webs',
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
    ButtonComponent
  ],
  templateUrl: './webs.component.html',
  styleUrl: './webs.component.scss'
})
export class WebsComponent implements OnInit {
  videos: any[] = [];
  private youtubeService = inject(YoutubeService); // 📌 Inyecta el servicio de YouTube

  // 📌 Definimos los elementos de los sidebars
  sidebarLeftItems = [
    { title: "Casas rurales", link: "/videos/casas-rurales" },
    { title: "Pisos urbanos", link: "/videos/pisos" },
    { title: "Chalets", link: "/videos/chalets" },
    { title: "Locales comerciales", link: "/videos/locales" }
  ];

  sidebarRightItems = [
    { title: "Casa en Arriondas", link: "/video/1" },
    { title: "Casita en Cornellana", link: "/video/2" },
    { title: "Piso en la playa de Bañugues", link: "/video/3" }
  ];

  ngOnInit(): void {}
  
}
