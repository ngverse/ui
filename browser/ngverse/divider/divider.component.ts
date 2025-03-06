import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-divider',
  imports: [],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
      background-color: var(--color-divider);
      height: 1px;
      width: 100%;

      &.vertical {
        height: 100%;
        width: 1px;
      }
    }
  `,
  host: {
    role: 'separator',
    '[class.vertical]': 'vertical()',
    '[attr.aria-orientation]': 'vertical() ? "vertical" : "horizontal"',
  },
})
export class DividerComponent {
  vertical = input(false);
}
