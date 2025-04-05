import { Routes } from '@angular/router';
import { ANIMATION_ROUTES } from './animation.routes';
import { GUIDES_ROUTES } from './guides.routes';
import { PIPES_ROUTES } from './pipes.routes';
import { UI_ROUTES } from './ui.routes';

export const routes: Routes = [
  {
    path: 'doc',
    loadComponent: () =>
      import('./features/doc-container-page/doc-container-page.component').then(
        (d) => d.DocContainerPageComponent
      ),
    children: [GUIDES_ROUTES, UI_ROUTES, PIPES_ROUTES, ANIMATION_ROUTES],
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/home-page/home-page.component').then(
        (h) => h.HomePageComponent
      ),
  },
];
