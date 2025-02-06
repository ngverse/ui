import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dark-mode-icon',
  template: `<svg
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DarkModeIconComponent {}
