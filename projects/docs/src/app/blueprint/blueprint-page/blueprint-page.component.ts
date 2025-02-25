import { DOCUMENT } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'doc-blueprint-page',
  templateUrl: './blueprint-page.component.html',
  styleUrl: './blueprint-page.component.css',
})
export class BlueprintPageComponent {
  label = input.required<string>();
  subTitle = input<string>();
  title = inject(Title);
  meta = inject(Meta);
  document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      const label = this.label();
      const subTitle = this.subTitle();
      this.title.setTitle(`${label} | ngverse`);
      if (subTitle) {
        this.meta.updateTag({ name: 'description', content: subTitle });
      }
      this.meta.addTags([
        { property: 'og:title', content: this.label() },
        {
          property: 'og:description',
          content: this.subTitle() ?? this.label(),
        },
        {
          property: 'og:image',
          content: 'https://www.ngverse.dev/logo.png',
        },
        { property: 'og:image:alt', content: 'NgVerse logo' },
        { property: 'og:url', content: this.document.location.href },
        { property: 'og:type', content: 'website' },
      ]);
    });
  }
}
