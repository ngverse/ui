import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface SidebarGroup {
  name: string;
  children: SidebarLink[];
}

export interface SidebarLink {
  name: string;
  url: string;
  done?: boolean;
}

// export function getAllSidebarLinks() {
//   return SIDEBAR_ROUTES.flatMap((group) => group.children);
// }

@Component({
  selector: 'doc-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  routes = input.required<SidebarGroup[]>();
}
