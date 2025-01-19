import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface Group {
  name: string;
  children: SidebarLink[];
}

export interface SidebarLink {
  name: string;
  url: string;
  done?: boolean;
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
    name: 'Elements',
    children: [
      {
        name: 'Accordion',
        url: '/doc/accordion',
        done: true,
      },
      {
        name: 'Alert',
        url: '/doc/alert',
        done: true,
      },
      {
        name: 'Autocomplete',
        url: '/doc/autocomplete',
      },
      {
        name: 'Button',
        url: '/doc/button',
        done: true,
      },
      {
        name: 'Badge',
        url: '/doc/badge',
        done: true,
      },
      {
        name: 'Checkbox',
        url: '/doc/checkbox',
        done: true,
      },
      {
        name: 'Card',
        url: '/doc/card',
        done: true,
      },
      {
        name: 'Divider',
        url: '/doc/divider',
        done: true,
      },
      {
        name: 'Skeleton',
        url: '/doc/skeleton',
        done: true,
      },
      {
        name: 'Loader',
        url: '/doc/loader',
        done: true,
      },
      {
        name: 'Radio Button',
        url: '/doc/radio-button',
        done: true,
      },
      {
        name: 'Switch',
        url: '/doc/switch',
        done: true,
      },
      {
        name: 'Toast',
        url: '/doc/toast',
        done: true,
      },
      {
        name: 'Tooltip',
        url: '/doc/tooltip',
        done: true,
      },
      {
        name: 'Textarea',
        url: '/doc/textarea',
        done: true,
      },
      {
        name: 'Select',
        url: '/doc/select',
        done: true,
      },
      {
        name: 'Progress Bar',
        url: '/doc/progress-bar',
        done: true,
      },
      {
        name: 'Dialog',
        url: '/doc/dialog',
      },
      {
        name: 'Tab',
        url: '/doc/tab',
        done: true,
      },
      {
        name: 'Input',
        url: '/doc/input',
        done: true,
      },
      {
        name: 'Form Field',
        url: '/doc/form-field',
        done: true,
      },
      {
        name: 'OTP Input',
        url: '/doc/otp-input',
      },
      {
        name: 'Icon',
        url: '/doc/icon',
        done: true,
      },
      {
        name: 'Popover',
        url: '/doc/popover',
      },
      {
        name: 'Context Menu',
        url: '/doc/context-menu',
      },
      {
        name: 'Listbox',
        url: '/doc/listbox',
      },
    ],
  },
  {
    name: 'Directives',
    children: [
      {
        name: 'OutsideClick',
        url: '/doc/outside-click',
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
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  routes: Group[] = SIDEBAR_ROUTES;
}
