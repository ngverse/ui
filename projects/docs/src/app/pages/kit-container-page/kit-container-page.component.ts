import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent, SidebarGroup } from '../sidebar/sidebar.component';

const routes: SidebarGroup[] = [
  {
    name: 'A11y',
    children: [
      {
        name: 'Accordion',
        url: '/kit/a11y-accordion',
      },
      {
        name: 'Tab',
        url: '/kit/a11y-tab',
      },
      {
        name: 'Alert',
        url: '/kit/a11y-alert',
      },
      {
        name: 'Session Storage',
        url: '/kit/session-storage',
      },
      {
        name: 'Local Storage',
        url: '/kit/local-storage',
      },
    ],
  },
];
@Component({
  selector: 'doc-kit-container-page',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './kit-container-page.component.html',
  styleUrl: './kit-container-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitContainerPageComponent {
  routes = routes;
}
