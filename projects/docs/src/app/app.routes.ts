import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'doc',
    loadComponent: () =>
      import('./features/doc-container-page/doc-container-page.component').then(
        (d) => d.DocContainerPageComponent
      ),
    children: [
      {
        path: 'button',
        loadComponent: () =>
          import('./features/button-page/button-page.component').then(
            (b) => b.ButtonPageComponent
          ),
      },
      {
        path: 'accordion',
        loadComponent: () =>
          import('./features/accordion-page/accordion-page.component').then(
            (b) => b.AccordionPageComponent
          ),
      },
      {
        path: 'outside-click',
        loadComponent: () =>
          import(
            './features/outside-click-page/outside-click-page.component'
          ).then((b) => b.OutsideClickPageComponent),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'doc',
    pathMatch: 'full',
  },
];
