import { ButtonComponent } from '@/ui/button/button.component';
import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import {
  matContentCopy,
  matContentPaste,
  matRocketLaunch,
} from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'doc-home-page',
  imports: [RouterLink, NgIcon, ButtonComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  Clipboard = matContentCopy;
  ClipboardPaste = matContentPaste;
  Rocket = matRocketLaunch;
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
        content: 'https://ui.ngverse.dev/logo.png',
      },
      { property: 'og:image:alt', content: 'NgVerse logo' },
      { property: 'og:url', content: this.document.location.href },
      { property: 'og:type', content: 'website' },
    ]);
  }
}
