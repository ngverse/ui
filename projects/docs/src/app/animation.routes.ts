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
      path: 'fade-in-up',
      loadComponent: () =>
        import(
          './pages/animations/fade-in-up-page/fade-in-up-page.component'
        ).then((f) => f.FadeInUpPageComponent),
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: '/doc/animations/fade-in',
    },
  ],
};
