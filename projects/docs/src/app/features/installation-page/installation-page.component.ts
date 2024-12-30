import { Component } from '@angular/core';
import { BlogH3Component } from "../../blog/blog-h3/blog-h3.component";
import { BlogH4Component } from "../../blog/blog-h4/blog-h4.component";
import { BlogPComponent } from "../../blog/blog-p/blog-p.component";
import { BlogPageComponent } from '../../blog/blog-page/blog-page.component';
import { SourceCodeComponent } from "../../blueprint/source-code/source-code.component";
import { ProjectNameComponent } from "../../core/project-name/project-name.component";

@Component({
  selector: 'doc-installation-page',
  imports: [BlogPageComponent, BlogH3Component, SourceCodeComponent, BlogH4Component, BlogPComponent, ProjectNameComponent],
  templateUrl: './installation-page.component.html',
  styleUrl: './installation-page.component.scss',
})
export class InstallationPageComponent {}
