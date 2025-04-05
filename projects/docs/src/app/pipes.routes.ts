import { Route } from '@angular/router';

export const PIPES_ROUTES: Route = {
  path: 'pipes',
  children: [
    {
      path: 'char-at',
      loadComponent: () =>
        import('./features/chart-at-page/chart-at-page.component').then(
          (c) => c.ChartAtPageComponent
        ),
    },
    {
      path: '',
      redirectTo: '/doc/pipes/char-at',
      pathMatch: 'full',
    },
  ],
};
