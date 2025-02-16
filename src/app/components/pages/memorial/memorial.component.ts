import { Component } from '@angular/core';
import { HeroComponent } from "../../shared/hero/hero.component";
import { SpacerComponent } from "../../shared/spacer/spacer.component";
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { TextContainerComponent } from "../../shared/text/text-container/text-container.component";

@Component({
  selector: 'app-memorial',
  standalone: true,
  imports: [HeroComponent, SpacerComponent, SidebarComponent, TextContainerComponent],
  templateUrl: './memorial.component.html',
  styleUrl: './memorial.component.scss'
})
export class MemorialComponent {

}
