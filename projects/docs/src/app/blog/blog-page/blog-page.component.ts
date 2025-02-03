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

  constructor() {
    effect(() => {
      const label = this.label();
      this.title.setTitle(`${label} | ng-verse`);
    });
  }
}
