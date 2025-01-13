import { Component } from '@angular/core';

@Component({
  selector: 'doc-check-icon',
  styles: [
    `
      :host {
        display: flex;
        width: 20px;
        height: 20px;
      }
    `,
  ],
  template: `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 448 512"
  >
    <!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
    <path
      fill="currentColor"
      d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
    />
  </svg>`,
})
export class CheckIconComponent {}
