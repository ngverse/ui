import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pagination-prev-icon',
  imports: [],
  template: `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-arrow-left"
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationPrevIconComponent {}
