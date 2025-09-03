import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../../services/youtube.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  videos: any[] = [];

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos(): void {
    this.youtubeService.getVideos().subscribe(response => {
      this.videos = response.items;
      
    });
  }
}
