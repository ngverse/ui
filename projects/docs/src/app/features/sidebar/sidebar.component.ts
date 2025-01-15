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
    name: 'Components',
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
        name: 'Autocomplete',
        url: '/doc/autocomplete',
      },
      {
        name: 'Button',
        url: '/doc/button',
      },
      {
        name: 'Badge',
        url: '/doc/badge',
        done: true,
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
        name: 'Progress Spinner',
        url: '/doc/progress-spinner',
      },
      {
        name: 'Loading Overlay',
        url: '/doc/loading-overlay',
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
