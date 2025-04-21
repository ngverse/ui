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
      path: 'join',
      loadComponent: () =>
        import('./pages/pipes/join-page/join-page.component').then(
          (c) => c.JoinPageComponent
        ),
    },
    {
      path: 'map',
      loadComponent: () =>
        import('./pages/pipes/map-page/map-page.component').then(
          (c) => c.MapPageComponent
        ),
    },
    {
      path: '',
      redirectTo: '/doc/pipes/configuration',
      pathMatch: 'full',
    },
  ],
};
