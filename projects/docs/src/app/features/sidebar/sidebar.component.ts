import { LowerCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DividerComponent } from '../../../../../ngverse/src/lib/ui/divider/divider.component';
import { SidebarState } from './sidebar.state';

@Component({
  selector: 'doc-sidebar',
  imports: [RouterLink, RouterLinkActive, LowerCasePipe, DividerComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  sidebarState = inject(SidebarState);

  navigations: { label: string; url: string }[] = [
    {
      label: 'Guides',
      url: '/doc/guides',
    },
    {
      label: 'UI',
      url: '/doc/ui',
    },
    {
      label: 'Pipes',
      url: '/doc/pipes',
    },
    {
      label: 'Animations',
      url: '/doc/animations',
    },
  ];
}
