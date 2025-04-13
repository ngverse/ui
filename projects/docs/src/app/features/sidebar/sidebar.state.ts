import { computed, inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import orderBy from 'lodash/orderBy';
import { filter } from 'rxjs';
import { ANIMATION_LINKS } from './animation-links';
import { GUIDES_LINKS } from './guide-links';
import { PIPE_LINKS } from './pipe-links';
import { SidebarGroup } from './sidebar-types';
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
] as SidebarGroup[];
@Injectable({
  providedIn: 'root',
})
export class SidebarState {
  readonly allRoutes = SIDEBAR_ROUTES;
  private _group = signal<SidebarGroup | undefined>(undefined);
  private _router = inject(Router);

  group = this._group.asReadonly();

  allLinks = computed(() => {
    const group = this.group();
    if (!group) {
      return [];
    }
    return [...(group.statics ?? []), ...(this.links() ?? [])];
  });

  links = computed(() => {
    if (this.group()?.sort) {
      return orderBy(this.group()?.children, 'name');
    }
    return this.group()?.children;
  });

  constructor() {
    this._router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this._router.url.includes('guides')) {
          this._group.set(this.allRoutes[0]);
        } else if (this._router.url.includes('ui')) {
          this._group.set(this.allRoutes[1]);
        } else if (this._router.url.includes('utils')) {
          this._group.set(this.allRoutes[2]);
        } else if (this._router.url.includes('pipes')) {
          this._group.set(this.allRoutes[3]);
        } else if (this._router.url.includes('animations')) {
          this._group.set(this.allRoutes[4]);
        }
      });
  }
}
