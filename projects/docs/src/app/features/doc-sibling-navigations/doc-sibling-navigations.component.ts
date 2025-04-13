import { ButtonComponent } from '@/ui/button/button.component';
import { FontIconComponent } from '@/ui/icon/font-icon.component';
import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { SidebarLink } from '../sidebar/sidebar-types';
import { SidebarState } from '../sidebar/sidebar.state';

@Component({
  selector: 'doc-doc-sibling-navigations',
  imports: [RouterLink, ButtonComponent, FontIconComponent],
  templateUrl: './doc-sibling-navigations.component.html',
  styleUrl: './doc-sibling-navigations.component.css',
})
export class DocSiblingNavigationsComponent {
  router = inject(Router);
  private _sidebarState = inject(SidebarState);
  prevRoute = signal<SidebarLink | undefined>(undefined);
  nextRoute = signal<SidebarLink | undefined>(undefined);

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        const currentPath = this.router.url;
        const group = this._sidebarState.group();
        const allLinks = this._sidebarState.allLinks();
        if (!allLinks.length || !group) {
          return;
        }

        const foundRouteIndex = this._sidebarState
          .allLinks()
          .findIndex((r) => currentPath.includes(r.url));
        this.prevRoute.set(undefined);
        this.nextRoute.set(undefined);
        if (foundRouteIndex !== -1) {
          if (foundRouteIndex !== 0) {
            const prevRouteIndex = foundRouteIndex - 1;
            this.prevRoute.set({
              name: allLinks[prevRouteIndex].name,
              url:
                group.name.toLowerCase() + '/' + allLinks[prevRouteIndex].url,
            });
          }
          if (foundRouteIndex !== allLinks.length - 1) {
            const nextRouteIndex = foundRouteIndex + 1;
            this.nextRoute.set({
              name: allLinks[nextRouteIndex].name,
              url:
                group.name.toLowerCase() + '/' + allLinks[nextRouteIndex].url,
            });
          }
        }
      });
  }
}
