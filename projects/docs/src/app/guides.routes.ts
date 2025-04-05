import { Route } from '@angular/router';

export const GUIDES_ROUTES: Route = {
  path: 'guides',
  children: [
    {
      path: 'introduction',
      loadComponent: () =>
        import('./features/introduction-page/introduction-page.component').then(
          (i) => i.IntroductionPageComponent
        ),
    },
    {
      path: 'installation',
      loadComponent: () =>
        import('./features/installation-page/installation-page.component').then(
          (i) => i.InstallationPageComponent
        ),
    },
    {
      path: 'schematics-usage',
      pathMatch: 'full',
      redirectTo: 'usage',
    },
    {
      path: 'usage',
      loadComponent: () =>
        import('./features/usage-page/usage-page.component').then(
          (u) => u.UsagePageComponent
        ),
    },
    {
      path: 'theming',
      loadComponent: () =>
        import('./features/theming-page/theming-page.component').then(
          (t) => t.ThemingPageComponent
        ),
    },
    {
      path: '',
      redirectTo: '/doc/guides/introduction',
      pathMatch: 'full',
    },
  ],
};
