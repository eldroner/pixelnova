import { Component, Input } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-sidebar-container',
  templateUrl: './sidebar-container.component.html',
  standalone:true,
  styleUrls: ['./sidebar-container.component.scss'],
  imports: [SidebarComponent]
})
export class SidebarContainerComponent {
  @Input() leftSidebarTitle: string = '';
  @Input() leftSidebarItems: { title: string, link: string }[] = [];
  @Input() rightSidebarTitle: string = '';
  @Input() rightSidebarItems: { title: string, link: string }[] = [];
}
