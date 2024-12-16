import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

type Group = {
  name: string;
  children: Link[];
};

type Link = {
  name: string;
  url: string;
};

@Component({
  selector: 'doc-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  routes: Group[] = [
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
        //   name: 'Button',
        //   url: '/doc/button',
        // },
        // {
        //   name: 'Toast',
        //   url: '/doc/toast',
        // },
        // {
        //   name: 'Tooltip',
        //   url: '/doc/tooltip',
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
        //   name: 'Radio Button',
        //   url: '/doc/radio-button',
        // },
        // {
        //   name: 'Select',
        //   url: '/doc/select',
        // },
        // {
        //   name: 'Dialog',
        //   url: '/doc/dialog',
        // },
        // {
        //   name: 'Skeleton',
        //   url: '/doc/skeleton',
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
}
