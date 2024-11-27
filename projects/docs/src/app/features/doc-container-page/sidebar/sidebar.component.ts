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
      name: 'Components',
      children: [
        {
          name: 'Button',
          url: '/doc/button',
        },
        {
          name: 'Accordion',
          url: '/doc/accordion',
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
  ];
}
