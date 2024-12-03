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
      {
        path: 'pagination',
        loadComponent: () =>
          import('./features/pagination-page/pagination-page.component').then(
            (p) => p.PaginationPageComponent
          ),
      },
      {
        path: 'checkbox',
        loadComponent: () =>
          import('./features/checkbox-page/checkbox-page.component').then(
            (c) => c.CheckboxPageComponent
          ),
      },
      {
        path: 'radio-button',
        loadComponent: () =>
          import('./features/radio-button-page/radio-button-page.component').then(
            (c) => c.RadioButtonPageComponent
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'doc',
    pathMatch: 'full',
  },
];
