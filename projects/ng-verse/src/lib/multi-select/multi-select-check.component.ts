import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-multi-select-check-icon',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-check"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectCheckIconComponent {}
