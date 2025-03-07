import { Component, OnInit, inject } from '@angular/core';
import { ButtonComponent } from "../../../../../shared/button/button.component";
import { HeroComponent } from "../../../../../shared/hero/hero.component";
import { VideoCardComponent } from "../../../../../shared/video-card/video-card.component";
import { CommonModule } from '@angular/common';
import { YoutubeService } from '../../../../../../services/youtube.service';
import { AemetService } from '../../../../../../services/aemet.service'; // ✅ Importamos el servicio Aemet
import { TextContainerComponent } from "../../../../../shared/text/text-container/text-container.component";
import { TitleComponent } from "../../../../../shared/text/title/title.component";
import { SubtitleComponent } from "../../../../../shared/text/subtitle/subtitle.component";
import { ParagraphComponent } from "../../../../../shared/text/paragraph/paragraph.component";
import { SpacerComponent } from "../../../../../shared/spacer/spacer.component";
import { SidebarComponent } from "../../../../../shared/sidebar/sidebar.component";
import { WeatherComponent } from "../../../../../shared/weatherform/weatherform.component"; // ✅ Importar WeatherComponent

@Component({
  selector: 'app-inmobiliaria',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, HeroComponent, VideoCardComponent,
    TextContainerComponent, TitleComponent, SubtitleComponent,
    ParagraphComponent, SpacerComponent, SidebarComponent,
    WeatherComponent
  ],
  templateUrl: './inmobiliaria.component.html',
  styleUrls: ['./inmobiliaria.component.scss'] // ✅ CORREGIDO: styleUrls en lugar de styleUrl
})
export class InmobiliariaComponent implements OnInit {
  videos: any[] = [];
  private youtubeService = inject(YoutubeService); // ✅ Inyectamos YouTubeService
  private aemetService = inject(AemetService); // ✅ Ahora inyectamos AemetService correctamente

  ngOnInit(): void {
    this.getVideos();
  }

  // ✅ Ahora usamos el servicio AemetService para enfocar el input
  enfocarCampoMunicipio() {
    this.aemetService.enfocarCampoMunicipio();
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
