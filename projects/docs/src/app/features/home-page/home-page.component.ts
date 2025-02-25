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
import { ButtonComponent } from '../../../../../ngverse/src/lib/button/button.component';
import { IconComponent } from '../../../../../ngverse/src/lib/icon/icon.component';
import { AlertBodyComponent } from '../../../../../ng-verse/src/lib/alert/alert-body.component';
import { AlertHeaderComponent } from '../../../../../ng-verse/src/lib/alert/alert-header.component';
import { AlertComponent } from '../../../../../ng-verse/src/lib/alert/alert.component';

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
  styleUrl: './home-page.component.scss',
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
