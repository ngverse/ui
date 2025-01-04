import { Component, input } from '@angular/core';

@Component({
  selector: 'app-badge-body',
  styles: `
    :host {
      display: inline;
      border-radius: 9999px;
      min-width: 16px;
      min-height: 16px;
      font-size: 12px;
      font-weight: 500;
      position: absolute;
      bottom: 100%;
      left: 100%;
      text-align: center;
      background-color: var(--app-primary-color);
      color: #fff;
      margin: -12px 0;
      padding: 0 4px;
    }
  `,
  template: `
    {{value()}}
  `,
})
export class BadgeBodyComponent {
  value = input.required<number>();
}
