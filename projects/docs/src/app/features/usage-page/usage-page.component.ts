import { FontIconComponent } from '@/ui/font-icon/font-icon.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPageComponent } from '../../blog/blog-page/blog-page.component';
import { ProjectNameComponent } from '../../core/project-name/project-name.component';
import { MODULE_NAVIGATIONS } from '../../module-navigations';

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

  categories = MODULE_NAVIGATIONS;
}
