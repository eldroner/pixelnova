import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-title',
  standalone: true,
  template: '<h1 [innerHTML]="safeText"></h1>',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {
  safeText: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  @Input() set text(value: string) {
    this.safeText = this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

