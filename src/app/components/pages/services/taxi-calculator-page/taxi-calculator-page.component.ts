import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ParagraphComponent } from '../../../shared/text/paragraph/paragraph.component';
import { TitleComponent } from '../../../shared/text/title/title.component';
import { SubtitleComponent } from '../../../shared/text/subtitle/subtitle.component';
import { HeroComponent } from '../../../shared/hero/hero.component';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { SpacerComponent } from '../../../shared/spacer/spacer.component';

@Component({
  selector: 'app-taxi-calculator-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ParagraphComponent,
    TitleComponent,
    SubtitleComponent,
    HeroComponent,
    SidebarComponent,
    SpacerComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './taxi-calculator-page.component.html',
  styleUrl: './taxi-calculator-page.component.scss',
})
export class TaxiCalculatorPageComponent implements OnInit {
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(
      'Calculadora de Tarifas Taxi | Pixelnova'
    );
  }
}
