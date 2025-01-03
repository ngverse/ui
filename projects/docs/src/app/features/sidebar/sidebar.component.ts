import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface Group {
  name: string;
  children: SidebarLink[];
}

export interface SidebarLink {
  name: string;
  url: string;
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
        name: 'Button',
        url: '/doc/button',
      },
      {
        name: 'Checkbox',
        url: '/doc/checkbox',
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
        name: 'Multi Select',
        url: '/doc/multi-select',
      },
      {
        name: 'SVG Icon',
        url: '/doc/svg-icon',
      },
      // {
      //   name: 'Breadcrumb',
      //   url: '/doc/breadcrumb',
      // },
      // {
      //   name: 'OTP Input',
      //   url: '/doc/otp-input',
      // },
      // {
      //   name: 'Progress Bar',
      //   url: '/doc/progress-bar',
      // },
      // {
      //   name: 'Toast',
      //   url: '/doc/toast',
      // },

      // {
      //   name: 'Checkbox',
      //   url: '/doc/checkbox',
      // },

      // {
      //   name: 'Pagination',
      //   url: '/doc/pagination',
      // },

      // {
      //   name: 'Dialog',
      //   url: '/doc/dialog',
      // },
      // {
      //   name: 'Switch',
      //   url: '/doc/switch',
      // },
      // {
      //   name: 'Tab',
      //   url: '/doc/tab',
      // },
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
];

export function getAllSidebarLinks(){
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
