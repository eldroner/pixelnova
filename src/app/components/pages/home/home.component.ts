import { Component } from '@angular/core';
import { HeroComponent } from "../../shared/hero/hero.component";
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { ServiceListComponent } from "../../shared/service-list/service-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, SidebarComponent, ServiceListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent { }
