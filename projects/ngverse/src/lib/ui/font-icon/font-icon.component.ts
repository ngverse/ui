import { coerceCssPixelValue } from '@angular/cdk/coercion';
import {
  booleanAttribute,
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
    '[style]': 'fillStyles()',
  },
})
export class FontIconComponent {
  size = input<string | number, string | number>('24px', {
    transform: (value) => coerceCssPixelValue(numberAttribute(value)),
  });
  variant = input<FONT_ICON_VARIANT>('outlined');
  variantClass = computed(() => {
    if (this.variant()) {
      return `material-symbols-${this.variant()}`;
    }
    return undefined;
  });
  fill = input(false, { transform: booleanAttribute });
  fillStyles = computed(() => {
    if (this.fill()) {
      return { fontVariationSettings: "'FILL' 1" };
    }
    return undefined;
  });
}
