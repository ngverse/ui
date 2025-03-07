import { ButtonComponent } from '@/ui/button/button.component';
import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import {
  matArrowBack,
  matArrowForward,
} from '@ng-icons/material-icons/baseline';
import { filter } from 'rxjs';
import { getAllSidebarLinks, SidebarLink } from '../sidebar/sidebar.component';

const SIDEBAR_LINKS = getAllSidebarLinks();

@Component({
  selector: 'doc-doc-sibling-navigations',
  imports: [RouterLink, NgIcon, ButtonComponent],
  templateUrl: './doc-sibling-navigations.component.html',
  styleUrl: './doc-sibling-navigations.component.css',
})
export class DocSiblingNavigationsComponent {
  router = inject(Router);
  prevRoute = signal<SidebarLink | undefined>(undefined);
  nextRoute = signal<SidebarLink | undefined>(undefined);
  ARROW_LEFT = matArrowBack;
  ARROW_RIGHT = matArrowForward;

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        const currentPath = this.router.url;

        const foundRouteIndex = SIDEBAR_LINKS.findIndex(
          (r) => r.url === currentPath
        );
        this.prevRoute.set(undefined);
        this.nextRoute.set(undefined);
        if (foundRouteIndex !== -1) {
          if (foundRouteIndex !== 0) {
            this.prevRoute.set(SIDEBAR_LINKS[foundRouteIndex - 1]);
          }
          if (foundRouteIndex !== SIDEBAR_LINKS.length - 1) {
            this.nextRoute.set(SIDEBAR_LINKS[foundRouteIndex + 1]);
          }
        }
      });
  }
}
