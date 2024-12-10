import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'doc-doc-container-page',
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './doc-container-page.component.html',
  styleUrl: './doc-container-page.component.scss',
})
export class DocContainerPageComponent {}
