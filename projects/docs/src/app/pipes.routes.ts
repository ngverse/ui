import { Route } from '@angular/router';

export const PIPES_ROUTES: Route = {
  path: 'pipes',
  children: [
    {
      path: 'configuration',
      loadComponent: () =>
        import(
          './pages/pipes/pipe-configuration-page/pipe-configuration-page.component'
        ).then((c) => c.PipeConfigurationPageComponent),
    },
    {
      path: 'char-at',
      loadComponent: () =>
        import('./features/chart-at-page/chart-at-page.component').then(
          (c) => c.ChartAtPageComponent
        ),
    },

    {
      path: '',
      redirectTo: '/doc/pipes/configuration',
      pathMatch: 'full',
    },
  ],
};
