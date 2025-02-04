import { Component } from '@angular/core';
import { HeroComponent } from "../../shared/hero/hero.component";
import { ButtonComponent } from "../../shared/button/button.component";
import { ServiceCardComponent } from "../../shared/service-card/service-card.component";
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, ButtonComponent, ServiceCardComponent, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent { }
