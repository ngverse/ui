import { Component, input } from '@angular/core';

@Component({
  selector: 'doc-project-name',
  imports: [],
  templateUrl: './project-name.component.html',
  styleUrl: './project-name.component.css',
})
export class ProjectNameComponent {
  code = input(false);
}
