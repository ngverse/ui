import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { ButtonLoaderComponent } from './button-loader.component';
type COLOR_TYPES = 'primary' | 'secondary' | 'danger' | 'success' | 'none';

type VARIANT_TYPES = 'fill' | 'outline' | 'link' | 'none';

type SIZE_TYPES = 'sm' | 'md' | 'lg' | 'none';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[appIconButton]',
  imports: [ButtonLoaderComponent],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classNames()',
    '[class.btn-disabled]': 'disabled()',
    '[class.btn-loading]': 'loading()',
    '[disabled]': 'disabled()',
  },
})
export class IconButtonComponent {
  color = input<COLOR_TYPES>('primary');

  variant = input<VARIANT_TYPES>('fill');

  disabled = input<boolean>();

  size = input<SIZE_TYPES>('md');

  loading = input<boolean>();

  classNames = computed(() => {
    return [
      `btn-${this.variant()}`,
      `btn-${this.color()}`,
      `btn-${this.size()}`,
    ];
  });
}
