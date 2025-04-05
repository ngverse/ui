import { LowerCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';

interface Group {
  name: string;
  children: SidebarLink[];
}

export interface SidebarLink {
  name: string;
  url: string;
  mode?: 'experimental';
}

export const SIDEBAR_ROUTES = [
  {
    name: 'Guides',
    children: [
      {
        name: 'Introduction',
        url: 'introduction',
      },
      {
        name: 'Installation',
        url: 'installation',
      },
      {
        name: 'Usage',
        url: 'usage',
      },
      {
        name: 'Theming',
        url: 'theming',
      },
    ],
  },
  {
    name: 'UI',
    children: [
      {
        name: 'Accordion',
        url: 'accordion',
      },
      {
        name: 'Alert',
        url: 'alert',
      },
      {
        name: 'Button',
        url: 'button',
      },
      {
        name: 'Badge',
        url: 'badge',
      },
      {
        name: 'Drawer',
        url: 'drawer',
      },
      {
        name: 'Checkbox',
        url: 'checkbox',
      },
      {
        name: 'Card',
        url: 'card',
      },
      {
        name: 'Divider',
        url: 'divider',
      },
      {
        name: 'Skeleton',
        url: 'skeleton',
      },
      {
        name: 'Loader',
        url: 'loader',
      },
      {
        name: 'Radio Button',
        url: 'radio-button',
      },
      {
        name: 'Switch',
        url: 'switch',
      },
      {
        name: 'Toast',
        url: 'toast',
      },
      {
        name: 'Tooltip',
        url: 'tooltip',
      },
      {
        name: 'Textarea',
        url: 'textarea',
      },
      {
        name: 'Select',
        url: 'select',
      },
      {
        name: 'Progress Bar',
        url: 'progress-bar',
      },
      {
        name: 'Dialog',
        url: 'dialog',
      },
      {
        name: 'Tab',
        url: 'tab',
      },
      {
        name: 'Input',
        url: 'input',
      },
      {
        name: 'Form Field',
        url: 'form-field',
      },
      {
        name: 'OTP Input',
        url: 'otp-input',
      },
      {
        name: 'Icon',
        url: 'icon',
      },
      {
        name: 'Popover',
        url: 'popover',
      },
      {
        name: 'Pagination',
        url: 'pagination',
      },
      {
        name: 'Context Menu',
        url: 'context-menu',
      },
      {
        name: 'Dark Mode',
        url: 'dark-mode',
      },
      {
        name: 'Table',
        url: 'table',
        mode: 'experimental',
      },
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
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
  {
    name: 'Pipes',
    children: [
      {
        name: 'CharAt',
        url: 'char-at',
        mode: 'experimental',
      },
    ],
  },
  {
    name: 'Animations',
    children: [
      {
        name: 'Fade In',
        url: 'fade-in',
      },
    ],
  },
] as Group[];

export function getAllSidebarLinks() {
  return SIDEBAR_ROUTES.flatMap((group) => group.children);
}

@Component({
  selector: 'doc-sidebar',
  imports: [RouterLink, RouterLinkActive, LowerCasePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  routes: Group[] = SIDEBAR_ROUTES;
  routeGroup = signal<Group | undefined>(undefined);
  private _router = inject(Router);
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
