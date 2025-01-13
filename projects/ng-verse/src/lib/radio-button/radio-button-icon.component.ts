import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-radio-button-icon',
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
      class="lucide lucide-circle-check"
    >
      <circle cx="12" cy="12" r="10" />
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
      class="lucide lucide-circle"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonIconComponent {
  checked = input.required<boolean>();
}
