import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import {
  Clipboard,
  ClipboardPaste,
  LucideAngularModule,
  Rocket,
} from 'lucide-angular';
import { AlertBodyComponent } from '../../../../../ngverse/src/lib/ui/alert/alert-body.component';
import { AlertHeaderComponent } from '../../../../../ngverse/src/lib/ui/alert/alert-header.component';
import { AlertComponent } from '../../../../../ngverse/src/lib/ui/alert/alert.component';
import { ButtonComponent } from '../../../../../ngverse/src/lib/ui/button/button.component';
import { IconComponent } from '../../../../../ngverse/src/lib/ui/icon/icon.component';

@Component({
  selector: 'doc-home-page',
  imports: [
    RouterLink,
    LucideAngularModule,
    IconComponent,
    ButtonComponent,
    AlertComponent,
    AlertHeaderComponent,
    AlertBodyComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  Clipboard = Clipboard;
  ClipboardPaste = ClipboardPaste;
  Rocket = Rocket;
  title = inject(Title);
  meta = inject(Meta);
  document = inject(DOCUMENT);
  constructor() {
    this.title.setTitle('ngverse');

    this.meta.addTags([
      { property: 'og:title', content: 'NgVerse' },
      {
        property: 'og:description',
        content: 'Collection of Angular components',
      },
      {
        property: 'og:image',
        content: 'https://www.ngverse.dev/logo.png',
      },
      { property: 'og:image:alt', content: 'NgVerse logo' },
      { property: 'og:url', content: this.document.location.href },
      { property: 'og:type', content: 'website' },
    ]);
  }
}
