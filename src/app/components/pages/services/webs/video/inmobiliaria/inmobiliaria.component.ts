import { Component, OnInit, inject } from '@angular/core';
import { ButtonComponent } from "../../../../../shared/button/button.component";
import { HeroComponent } from "../../../../../shared/hero/hero.component";
import { VideoCardComponent } from "../../../../../shared/video-card/video-card.component";
import { CommonModule } from '@angular/common';
import { YoutubeService } from '../../../../../../services/youtube.service';
import { TextContainerComponent } from "../../../../../shared/text/text-container/text-container.component";
import { TitleComponent } from "../../../../../shared/text/title/title.component";
import { SubtitleComponent } from "../../../../../shared/text/subtitle/subtitle.component";
import { ParagraphComponent } from "../../../../../shared/text/paragraph/paragraph.component";
import { SpacerComponent } from "../../../../../shared/spacer/spacer.component";
import { SidebarComponent } from "../../../../../shared/sidebar/sidebar.component";
import { WeatherComponent } from "../../../../../shared/weatherform/weatherform.component"; // ✅ Importar SidebarComponent

@Component({
  selector: 'app-inmobiliaria',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, HeroComponent, VideoCardComponent,
    TextContainerComponent, TitleComponent, SubtitleComponent,
    ParagraphComponent, SpacerComponent, SidebarComponent // ✅ Añadir SidebarComponent aquí
    ,
    WeatherComponent
],
  templateUrl: './inmobiliaria.component.html',
  styleUrl: './inmobiliaria.component.scss'
})
export class InmobiliariaComponent implements OnInit {
  videos: any[] = [];
  private youtubeService = inject(YoutubeService); // ✅ Inyectamos el servicio

  // 🔹 Definimos los elementos de los sidebar
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

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos(): void {
    const playlistId = 'PL5g-58hYPsTg2YT2aIM_ZaoqyGNJy8arP'; // 🔹 Playlist corregida

    console.log("🎬 Solicitando vídeos de la playlist:", playlistId); // ✅ Verificar que el ID es correcto

    this.youtubeService.getVideos(playlistId).subscribe({
      next: (response) => {
        console.log("📹 Respuesta de la API de YouTube:", response); // ✅ Depuración
        this.videos = response.items || []; // 🔹 Si response.items es `undefined`, asignamos un array vacío
      },
      error: (err) => {
        console.error("❌ Error al cargar los vídeos:", err); // ❌ Si hay un error, se mostrará en la consola
      }
    });
  }
}
