import { Component } from '@angular/core';
import { BlogPageComponent } from '../../blog/blog-page/blog-page.component';
import { ProjectNameComponent } from '../../core/project-name/project-name.component';

@Component({
  selector: 'doc-introduction-page',
  imports: [BlogPageComponent, ProjectNameComponent],
  templateUrl: './introduction-page.component.html',
  styleUrl: './introduction-page.component.css',
})
export class IntroductionPageComponent {}
