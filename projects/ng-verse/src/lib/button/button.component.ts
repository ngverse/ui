import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonLoaderComponent } from './button-loader.component';

type COLOR_TYPES =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'default'
  | 'none';

type VARIANT_TYPES = 'fill' | 'stroked' | 'link' | 'none';

type SIZE_TYPES = 'sm' | 'md' | 'lg' | 'none';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[appButton]',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  imports: [ButtonLoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '[variant(),color(),size()]',
    '[class.disabled]': 'disabled()',
    '[class.loading]': 'loading()',
    '[attr.disabled]': 'disabled()',
  },
})
export class ButtonComponent {
  color = input<COLOR_TYPES>('primary');

  variant = input<VARIANT_TYPES>('fill');

  disabled = input<boolean>();

  size = input<SIZE_TYPES>('md');

  loading = input<boolean>();
}
