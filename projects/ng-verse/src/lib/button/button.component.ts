import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type COLOR_TYPES =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'default';

type VARIANT_TYPES = 'fill' | 'outline' | 'link';

type SIZE_TYPES = 'sm' | 'md' | 'lg';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[appButton]',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '[variant(),color(),size()]',
    '[class.disabled]': 'disabled() || loading()',
    '[attr.disabled]': 'disabled() || loading()',
  },
})
export class ButtonComponent {
  color = input<COLOR_TYPES>('primary');

  variant = input<VARIANT_TYPES>('fill');

  disabled = input<boolean>();

  size = input<SIZE_TYPES>('md');

  loading = input<boolean>();
}
