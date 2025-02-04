import { DOCUMENT } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'doc-blog-page',
  imports: [],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss',
})
export class BlogPageComponent {
  label = input.required<string>();
  title = inject(Title);
  meta = inject(Meta);
  document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      const label = this.label();
      this.title.setTitle(`${label} | ng-verse`);
      this.meta.addTags([
        { property: 'og:title', content: this.label() },
        {
          property: 'og:description',
        },
        {
          property: 'og:image',
          content: 'https://www.ng-verse.dev/logo.png',
        },
        { property: 'og:image:alt', content: 'Ng-Verse logo' },
        { property: 'og:url', content: this.document.location.href },
        { property: 'og:type', content: 'website' },
      ]);
    });
  }
}
