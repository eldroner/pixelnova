import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from '../../../../../../components/shared/weatherform/weatherform.component';
import { HeroComponent } from "../../../../../shared/hero/hero.component";
import { SpacerComponent } from "../../../../../shared/spacer/spacer.component";
import { SidebarComponent } from "../../../../../shared/sidebar/sidebar.component";
import { TextContainerComponent } from "../../../../../shared/text/text-container/text-container.component";
import { TitleComponent } from "../../../../../shared/text/title/title.component";
import { SubtitleComponent } from "../../../../../shared/text/subtitle/subtitle.component";
import { ParagraphComponent } from "../../../../../shared/text/paragraph/paragraph.component";
import { VideoCardComponent } from "../../../../../shared/video-card/video-card.component";
import { ButtonComponent } from "../../../../../shared/button/button.component"; 
import { YoutubeService } from '../../../../../../services/youtube.service'; // ✅ Servicio para obtener vídeos

@Component({
  selector: 'app-turismo',
  standalone: true,
  imports: [
    CommonModule, WeatherComponent, HeroComponent, SpacerComponent, SidebarComponent, 
    TextContainerComponent, TitleComponent, SubtitleComponent, ParagraphComponent, 
    VideoCardComponent, ButtonComponent
  ],
  templateUrl: './turismo.component.html',
  styleUrls: ['./turismo.component.scss'], 
})
export class TurismoComponent implements OnInit {
  videos: any[] = [];
  private youtubeService = inject(YoutubeService); // ✅ Inyectamos el servicio

  // 🔹 Definimos los elementos de los sidebars
  sidebarLeftItems = [
    { title: "Playas", link: "/videos/playas" },
    { title: "Rutas de senderismo", link: "/videos/senderismo" },
    { title: "Ciudades y pueblos", link: "/videos/ciudades" },
    { title: "Hoteles y alojamientos", link: "/videos/hoteles" }
  ];

  sidebarRightItems = [
    { title: "Descubre la Playa de Gulpiyuri", link: "/video/1" },
    { title: "Explora los Picos de Europa", link: "/video/2" },
    { title: "Un recorrido por Llanes", link: "/video/3" }
  ];

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos(): void {
    const playlistId = 'PL5g-58hYPsTg2YT2aIM_ZaoqyGNJy8arP'; // 🔹 Reemplaza con la ID de la playlist de turismo

    console.log("🎬 Solicitando vídeos de la playlist:", playlistId);

    this.youtubeService.getVideos(playlistId).subscribe({
      next: (response) => {
        console.log("📹 Respuesta de la API de YouTube:", response);
        this.videos = response.items || []; // 🔹 Si response.items es `undefined`, asignamos un array vacío
      },
      error: (err) => {
        console.error("❌ Error al cargar los vídeos:", err);
      }
    });
  }
}
