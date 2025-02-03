import { Component, effect, inject, input } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'doc-blueprint-page',
  templateUrl: './blueprint-page.component.html',
  styleUrl: './blueprint-page.component.scss',
})
export class BlueprintPageComponent {
  label = input.required<string>();
  subTitle = input<string>();
  title = inject(Title);
  meta = inject(Meta);

  constructor() {
    effect(() => {
      const label = this.label();
      const subTitle = this.subTitle();
      this.title.setTitle(`${label} | ng-verse`);
      if (subTitle) {
        this.meta.updateTag({ name: 'description', content: subTitle });
      }
    });
  }
}
