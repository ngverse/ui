import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectNameComponent } from "../../core/project-name/project-name.component";

@Component({
  selector: 'doc-header',
  imports: [RouterLink, ProjectNameComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
