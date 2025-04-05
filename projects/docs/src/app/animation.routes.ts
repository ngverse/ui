import { Route } from '@angular/router';

export const ANIMATION_ROUTES: Route = {
  path: 'animations',
  children: [
    {
      path: 'fade-in',
      loadComponent: () =>
        import('./pages/animations/fade-in-page/fade-in-page.component').then(
          (f) => f.FadeInPageComponent
        ),
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: '/doc/animations/fade-in',
    },
  ],
};
