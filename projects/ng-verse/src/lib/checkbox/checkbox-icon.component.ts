import { Component, input } from '@angular/core';

@Component({
  selector: 'app-checkbox-icon',
  template: `
    @if(checked()){
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-square-check"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="m9 12 2 2 4-4" />
    </svg>
    } @else {
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-square"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
    </svg>
    }
  `,
})
export class CheckboxIconComponent {
  checked = input.required<boolean | undefined | null>();
}
