import {
  booleanAttribute,
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
  selector: 'button[appButton]',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  imports: [ButtonLoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classNames()',
    '[class.btn-disabled]': 'disabled()',
    '[class.btn-loading]': 'loading()',
    '[disabled]': 'disabled()',
    '[class.icon]': 'icon()',
  },
})
export class ButtonComponent {
  color = input<COLOR_TYPES>('primary');

  variant = input<VARIANT_TYPES>('fill');

  disabled = input<boolean>();

  size = input<SIZE_TYPES>('md');

  icon = input(undefined, { transform: booleanAttribute });

  loading = input<boolean>();

  classNames = computed(() => {
    return [
      `btn-${this.variant()}`,
      `btn-${this.color()}`,
      `btn-${this.size()}`,
    ];
  });
}
