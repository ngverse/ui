import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocSiblingNavigationsComponent } from '../doc-sibling-navigations/doc-sibling-navigations.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'doc-doc-container-page',
  imports: [SidebarComponent, RouterOutlet, DocSiblingNavigationsComponent],
  templateUrl: './doc-container-page.component.html',
  styleUrl: './doc-container-page.component.scss',
})
export class DocContainerPageComponent {}
