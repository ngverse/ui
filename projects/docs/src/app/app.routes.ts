import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '@ngverse/kit',
    loadComponent: () =>
      import('./pages/kit-container-page/kit-container-page.component').then(
        (k) => k.KitContainerPageComponent
      ),
    children: [
      {
        path: 'a11y-accordion',
        loadComponent: () =>
          import(
            './pages/a11y-accordion-page/a11y-accordion-page.component'
          ).then((d) => d.A11yAccordionPageComponent),
      },
      {
        path: 'a11y-tab',
        loadComponent: () =>
          import('./pages/a11y-tab-page/a11y-tab-page.component').then(
            (d) => d.A11yTabPageComponent
          ),
      },
      {
        path: 'a11y-alert',
        loadComponent: () =>
          import('./pages/a11y-alert-page/a11y-alert-page.component').then(
            (d) => d.A11yAlertPageComponent
          ),
      },
      {
        path: '',
        redirectTo: 'a11y-accordion',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'doc',
    loadComponent: () =>
      import('./pages/doc-container-page/doc-container-page.component').then(
        (d) => d.DocContainerPageComponent
      ),
    children: [
      {
        path: 'introduction',
        loadComponent: () =>
          import('./pages/introduction-page/introduction-page.component').then(
            (i) => i.IntroductionPageComponent
          ),
      },
      {
        path: 'installation',
        loadComponent: () =>
          import('./pages/installation-page/installation-page.component').then(
            (i) => i.InstallationPageComponent
          ),
      },
      {
        path: 'schematics-usage',
        loadComponent: () =>
          import(
            './pages/schematics-usage-page/schematics-usage-page.component'
          ).then((i) => i.SchematicsUsagePageComponent),
      },
      {
        path: 'usage',
        loadComponent: () =>
          import('./pages/usage-page/usage-page.component').then(
            (u) => u.UsagePageComponent
          ),
      },
      {
        path: 'theming',
        loadComponent: () =>
          import('./pages/theming-page/theming-page.component').then(
            (t) => t.ThemingPageComponent
          ),
      },
      {
        path: 'accordion',
        loadComponent: () =>
          import('./pages/accordion-page/accordion-page.component').then(
            (b) => b.AccordionPageComponent
          ),
      },
      {
        path: 'autocomplete',
        loadComponent: () =>
          import('./pages/autocomplete-page/autocomplete-page.component').then(
            (b) => b.AutocompletePageComponent
          ),
      },
      {
        path: 'alert',
        loadComponent: () =>
          import('./pages/alert-page/alert-page.component').then(
            (b) => b.AlertPageComponent
          ),
      },
      {
        path: 'badge',
        loadComponent: () =>
          import('./pages/badge-page/badge-page.component').then(
            (b) => b.BadgePageComponent
          ),
      },
      {
        path: 'card',
        loadComponent: () =>
          import('./pages/card-page/card-page.component').then(
            (b) => b.CardPageComponent
          ),
      },
      {
        path: 'divider',
        loadComponent: () =>
          import('./pages/divider-page/divider-page.component').then(
            (b) => b.DividerPageComponent
          ),
      },
      {
        path: 'drawer',
        loadComponent: () =>
          import('./pages/drawer-page/drawer-page.component').then(
            (b) => b.DrawerPageComponent
          ),
      },
      {
        path: 'otp-input',
        loadComponent: () =>
          import('./pages/otp-input-page/otp-input-page.component').then(
            (b) => b.OtpInputPageComponent
          ),
      },
      {
        path: 'progress-bar',
        loadComponent: () =>
          import('./pages/progress-bar-page/progress-bar-page.component').then(
            (b) => b.ProgressBarPageComponent
          ),
      },
      {
        path: 'tooltip',
        loadComponent: () =>
          import('./pages/tooltip-page/tooltip-page.component').then(
            (b) => b.TooltipPageComponent
          ),
      },
      {
        path: 'toast',
        loadComponent: () =>
          import('./pages/toast-page/toast-page.component').then(
            (b) => b.ToastPageComponent
          ),
      },
      {
        path: 'button',
        loadComponent: () =>
          import('./pages/button-page/button-page.component').then(
            (b) => b.ButtonPageComponent
          ),
      },
      {
        path: 'outside-click',
        loadComponent: () =>
          import(
            './pages/outside-click-page/outside-click-page.component'
          ).then((b) => b.OutsideClickPageComponent),
      },
      {
        path: 'checkbox',
        loadComponent: () =>
          import('./pages/checkbox-page/checkbox-page.component').then(
            (c) => c.CheckboxPageComponent
          ),
      },
      {
        path: 'radio-button',
        loadComponent: () =>
          import('./pages/radio-button-page/radio-button-page.component').then(
            (c) => c.RadioButtonPageComponent
          ),
      },
      {
        path: 'select',
        loadComponent: () =>
          import('./pages/select-page/select-page.component').then(
            (c) => c.SelectPageComponent
          ),
      },
      {
        path: 'dialog',
        loadComponent: () =>
          import('./pages/dialog-page/dialog-page.component').then(
            (d) => d.DialogPageComponent
          ),
      },
      {
        path: 'skeleton',
        loadComponent: () =>
          import('./pages/skeleton-page/skeleton-page.component').then(
            (d) => d.SkeletonPageComponent
          ),
      },
      {
        path: 'switch',
        loadComponent: () =>
          import('./pages/switch-page/switch-page.component').then(
            (d) => d.SwitchPageComponent
          ),
      },
      {
        path: 'tab',
        loadComponent: () =>
          import('./pages/tab-page/tab-page.component').then(
            (d) => d.TabPageComponent
          ),
      },
      {
        path: 'textarea',
        loadComponent: () =>
          import('./pages/textarea-page/textarea-page.component').then(
            (d) => d.TextareaPageComponent
          ),
      },
      {
        path: 'input',
        loadComponent: () =>
          import('./pages/input-page/input-page.component').then(
            (d) => d.InputPageComponent
          ),
      },
      {
        path: 'form-field',
        loadComponent: () =>
          import('./pages/form-field-page/form-field-page.component').then(
            (d) => d.FormFieldPageComponent
          ),
      },
      {
        path: 'icon',
        loadComponent: () =>
          import('./pages/icon-page/icon-page.component').then(
            (b) => b.IconPageComponent
          ),
      },
      {
        path: 'popover',
        loadComponent: () =>
          import('./pages/popover-page/popover-page.component').then(
            (p) => p.PopoverPageComponent
          ),
      },
      {
        path: 'pagination',
        loadComponent: () =>
          import('./pages/pagination-page/pagination-page.component').then(
            (b) => b.PaginationPageComponent
          ),
      },
      {
        path: 'context-menu',
        loadComponent: () =>
          import('./pages/context-menu-page/context-menu-page.component').then(
            (p) => p.ContextMenuPageComponent
          ),
      },
      {
        path: 'loader',
        loadComponent: () =>
          import('./pages/loader-page/loader-page.component').then(
            (p) => p.LoaderPageComponent
          ),
      },
      {
        path: 'local-storage',
        loadComponent: () =>
          import(
            './pages/local-storage-page/local-storage-page.component'
          ).then((p) => p.LocalStoragePageComponent),
      },
      {
        path: 'session-storage',
        loadComponent: () =>
          import(
            './pages/session-storage-page/session-storage-page.component'
          ).then((p) => p.SessionStoragePageComponent),
      },
      {
        path: 'dark-mode',
        loadComponent: () =>
          import('./pages/dark-mode-page/dark-mode-page.component').then(
            (p) => p.DarkModePageComponent
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
      import('./pages/home-page/home-page.component').then(
        (h) => h.HomePageComponent
      ),
  },
];
