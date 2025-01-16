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
        path: 'introduction',
        loadComponent: () =>
          import(
            './features/introduction-page/introduction-page.component'
          ).then((i) => i.IntroductionPageComponent),
      },
      {
        path: 'installation',
        loadComponent: () =>
          import(
            './features/installation-page/installation-page.component'
          ).then((i) => i.InstallationPageComponent),
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
        path: 'accordion',
        loadComponent: () =>
          import('./features/accordion-page/accordion-page.component').then(
            (b) => b.AccordionPageComponent
          ),
      },
      {
        path: 'autocomplete',
        loadComponent: () =>
          import(
            './features/autocomplete-page/autocomplete-page.component'
          ).then((b) => b.AutocompletePageComponent),
      },
      {
        path: 'alert',
        loadComponent: () =>
          import('./features/alert-page/alert-page.component').then(
            (b) => b.AlertPageComponent
          ),
      },
      {
        path: 'breadcrumb',
        loadComponent: () =>
          import('./features/breadcrumb-page/breadcrumb-page.component').then(
            (b) => b.BreadcrumbPageComponent
          ),
      },
      {
        path: 'badge',
        loadComponent: () =>
          import('./features/badge-page/badge-page.component').then(
            (b) => b.BadgePageComponent
          ),
      },
      {
        path: 'card',
        loadComponent: () =>
          import('./features/card-page/card-page.component').then(
            (b) => b.CardPageComponent
          ),
      },
      {
        path: 'divider',
        loadComponent: () =>
          import('./features/divider-page/divider-page.component').then(
            (b) => b.DividerPageComponent
          ),
      },
      {
        path: 'otp-input',
        loadComponent: () =>
          import('./features/otp-input-page/otp-input-page.component').then(
            (b) => b.OtpInputPageComponent
          ),
      },
      {
        path: 'progress-bar',
        loadComponent: () =>
          import(
            './features/progress-bar-page/progress-bar-page.component'
          ).then((b) => b.ProgressBarPageComponent),
      },
      {
        path: 'tooltip',
        loadComponent: () =>
          import('./features/tooltip-page/tooltip-page.component').then(
            (b) => b.TooltipPageComponent
          ),
      },
      {
        path: 'toast',
        loadComponent: () =>
          import('./features/toast-page/toast-page.component').then(
            (b) => b.ToastPageComponent
          ),
      },
      {
        path: 'button',
        loadComponent: () =>
          import('./features/button-page/button-page.component').then(
            (b) => b.ButtonPageComponent
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
          import(
            './features/radio-button-page/radio-button-page.component'
          ).then((c) => c.RadioButtonPageComponent),
      },
      {
        path: 'select',
        loadComponent: () =>
          import('./features/select-page/select-page.component').then(
            (c) => c.SelectPageComponent
          ),
      },
      {
        path: 'dialog',
        loadComponent: () =>
          import('./features/dialog-page/dialog-page.component').then(
            (d) => d.DialogPageComponent
          ),
      },
      {
        path: 'skeleton',
        loadComponent: () =>
          import('./features/skeleton-page/skeleton-page.component').then(
            (d) => d.SkeletonPageComponent
          ),
      },
      {
        path: 'switch',
        loadComponent: () =>
          import('./features/switch-page/switch-page.component').then(
            (d) => d.SwitchPageComponent
          ),
      },
      {
        path: 'tab',
        loadComponent: () =>
          import('./features/tab-page/tab-page.component').then(
            (d) => d.TabPageComponent
          ),
      },
      {
        path: 'textarea',
        loadComponent: () =>
          import('./features/textarea-page/textarea-page.component').then(
            (d) => d.TextareaPageComponent
          ),
      },
      {
        path: 'progress-spinner',
        loadComponent: () =>
          import(
            './features/progress-spinner-page/progress-spinner-page.component'
          ).then((d) => d.ProgressSpinnerPageComponent),
      },
      {
        path: 'loading-overlay',
        loadComponent: () =>
          import(
            './features/loading-overlay-page/loading-overlay-page.component'
          ).then((d) => d.LoadingOverlayPageComponent),
      },
      {
        path: 'input',
        loadComponent: () =>
          import('./features/input-page/input-page.component').then(
            (d) => d.InputPageComponent
          ),
      },
      {
        path: 'form-field',
        loadComponent: () =>
          import('./features/form-field-page/form-field-page.component').then(
            (d) => d.FormFieldPageComponent
          ),
      },
      {
        path: 'icon',
        loadComponent: () =>
          import('./features/icon-page/icon-page.component').then(
            (b) => b.IconPageComponent
          ),
      },
      {
        path: 'popover',
        loadComponent: () =>
          import('./features/popover-page/popover-page.component').then(
            (p) => p.PopoverPageComponent
          ),
      },
      {
        path: 'context-menu',
        loadComponent: () =>
          import(
            './features/context-menu-page/context-menu-page.component'
          ).then((p) => p.ContextMenuPageComponent),
      },
      {
        path: 'listbox',
        loadComponent: () =>
          import('./features/listbox-page/listbox-page.component').then(
            (p) => p.ListboxPageComponent
          ),
      },
      {
        path: 'loader',
        loadComponent: () =>
          import('./features/loader-page/loader-page.component').then(
            (p) => p.LoaderPageComponent
          ),
      },
      {
        path: '',
        redirectTo: 'introduction',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/home-page/home-page.component').then(
        (h) => h.HomePageComponent
      ),
  },
];
