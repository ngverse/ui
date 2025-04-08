import { OrderByPipe } from '@/pipes/order-by.pipe';
import { LowerCasePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { orderBy } from 'lodash';
import { filter } from 'rxjs';
import { ANIMATION_LINKS } from './animation-links';
import { GUIDES_LINKS } from './guide-links';
import { PIPE_LINKS } from './pipe-links';
import { Group } from './sidebar-types';
import { UI_LINKS } from './ui-links';

export const SIDEBAR_ROUTES = [
  GUIDES_LINKS,
  UI_LINKS,
  {
    name: 'Utils',
    children: [
      {
        name: 'LocalStorage',
        url: 'local-storage',
      },
      {
        name: 'SessionStorage',
        url: 'session-storage',
      },
    ],
  },
  PIPE_LINKS,
  ANIMATION_LINKS,
] as Group[];

export function getAllSidebarLinks() {
  return SIDEBAR_ROUTES.flatMap((group) => group.children);
}

@Component({
  selector: 'doc-sidebar',
  imports: [RouterLink, RouterLinkActive, LowerCasePipe, OrderByPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  routes: Group[] = SIDEBAR_ROUTES;
  routeGroup = signal<Group | undefined>(undefined);
  private _router = inject(Router);

  links = computed(() => {
    if (this.routeGroup()?.sort) {
      return orderBy(this.routeGroup()?.children, 'name');
    }
    return this.routeGroup()?.children;
  });

  constructor() {
    this._router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this._router.url.includes('guides')) {
          this.routeGroup.set(this.routes[0]);
        } else if (this._router.url.includes('ui')) {
          this.routeGroup.set(this.routes[1]);
        } else if (this._router.url.includes('utils')) {
          this.routeGroup.set(this.routes[2]);
        } else if (this._router.url.includes('pipes')) {
          this.routeGroup.set(this.routes[3]);
        } else if (this._router.url.includes('animations')) {
          this.routeGroup.set(this.routes[4]);
        }
      });
  }
}
