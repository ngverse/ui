import { coerceCssPixelValue } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';

export type FONT_ICON_VARIANT = 'outlined' | 'rounded' | 'sharp';

@Component({
  selector: 'app-font-icon',
  imports: [],
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: flex;
    }
  `,
  host: {
    role: 'img',
    '[attr.aria-hidden]': 'true',
    '[class]': 'variantClass()',
    '[style.fontSize]': 'size()',
  },
})
export class FontIconComponent {
  size = input<string | number, string>('24px', {
    transform: (value) => coerceCssPixelValue(numberAttribute(value)),
  });
  variant = input<FONT_ICON_VARIANT>('outlined');
  variantClass = computed(() => {
    if (this.variant()) {
      return `material-symbols-${this.variant()}`;
    }
    return undefined;
  });
}
