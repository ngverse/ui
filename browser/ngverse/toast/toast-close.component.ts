import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-toast-close-icon',
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
  template: `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-x"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastCloseIconComponent {}
