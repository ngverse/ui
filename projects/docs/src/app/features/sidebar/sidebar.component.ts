import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
    name: 'Getting Started',
    children: [
      {
        name: 'Introduction',
        url: '/doc/introduction',
      },
      {
        name: 'Installation',
        url: '/doc/installation',
      },
      {
        name: 'Usage',
        url: '/doc/usage',
      },
      {
        name: 'Theming',
        url: '/doc/theming',
      },
    ],
  },
  {
    name: 'UI',
    children: [
      {
        name: 'Accordion',
        url: '/doc/accordion',
      },
      {
        name: 'Alert',
        url: '/doc/alert',
      },
      {
        name: 'Button',
        url: '/doc/button',
      },
      {
        name: 'Badge',
        url: '/doc/badge',
      },
      {
        name: 'Drawer',
        url: '/doc/drawer',
      },
      {
        name: 'Checkbox',
        url: '/doc/checkbox',
      },
      {
        name: 'Card',
        url: '/doc/card',
      },
      {
        name: 'Divider',
        url: '/doc/divider',
      },
      {
        name: 'Skeleton',
        url: '/doc/skeleton',
      },
      {
        name: 'Loader',
        url: '/doc/loader',
      },
      {
        name: 'Radio Button',
        url: '/doc/radio-button',
      },
      {
        name: 'Switch',
        url: '/doc/switch',
      },
      {
        name: 'Toast',
        url: '/doc/toast',
      },
      {
        name: 'Tooltip',
        url: '/doc/tooltip',
      },
      {
        name: 'Textarea',
        url: '/doc/textarea',
      },
      {
        name: 'Select',
        url: '/doc/select',
      },
      {
        name: 'Progress Bar',
        url: '/doc/progress-bar',
      },
      {
        name: 'Dialog',
        url: '/doc/dialog',
      },
      {
        name: 'Tab',
        url: '/doc/tab',
      },
      {
        name: 'Input',
        url: '/doc/input',
      },
      {
        name: 'Form Field',
        url: '/doc/form-field',
      },
      {
        name: 'OTP Input',
        url: '/doc/otp-input',
      },
      {
        name: 'Icon',
        url: '/doc/icon',
      },
      {
        name: 'Popover',
        url: '/doc/popover',
      },
      {
        name: 'Pagination',
        url: '/doc/pagination',
      },
      {
        name: 'Context Menu',
        url: '/doc/context-menu',
      },
      {
        name: 'Dark Mode',
        url: '/doc/dark-mode',
      },
      {
        name: 'Table',
        url: '/doc/table',
        mode: 'experimental',
      },
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    name: 'Utils',
    children: [
      {
        name: 'LocalStorage',
        url: '/doc/local-storage',
      },
      {
        name: 'SessionStorage',
        url: '/doc/session-storage',
      },
    ],
  },
  {
    name: 'Pipes',
    children: [
      {
        name: 'CharAt',
        url: '/doc/pipe/char-at',
      },
    ],
  },
] as Group[];

export function getAllSidebarLinks() {
  return SIDEBAR_ROUTES.flatMap((group) => group.children);
}

@Component({
  selector: 'doc-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  routes: Group[] = SIDEBAR_ROUTES;
}
