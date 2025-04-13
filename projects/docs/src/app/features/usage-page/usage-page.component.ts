import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontIconComponent } from '../../../../../ngverse/src/lib/ui/icon/font-icon.component';
import { BlogPageComponent } from '../../blog/blog-page/blog-page.component';
import { ProjectNameComponent } from '../../core/project-name/project-name.component';

@Component({
  selector: 'doc-usage-page',
  imports: [
    BlogPageComponent,
    ProjectNameComponent,
    RouterLink,
    FontIconComponent,
  ],
  templateUrl: './usage-page.component.html',
  styleUrl: './usage-page.component.css',
})
export class UsagePageComponent {
  configCode = ` "projectType": "application",
  "schematics": {
    "@ngverse/ui:add": {
      "path": "ui"
    }
  }`;

  categories = signal<{ name: string; url: string; icon: string }[]>([
    {
      name: 'UI',
      url: '/doc/ui',
      icon: 'settop_component',
    },
    {
      name: 'Pipes',
      icon: 'valve',
      url: '/doc/pipes',
    },
    {
      name: 'Animations',
      url: '/doc/animations',
      icon: 'animation',
    },
  ]);
}
