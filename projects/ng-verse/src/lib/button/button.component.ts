import { NgClass } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

type BUTTON_VARIANT_TYPES =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'success'
  | 'warning';

@Component({
  selector: 'doc-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  variant = input<BUTTON_VARIANT_TYPES>('primary');

  disabled = input(undefined, { transform: booleanAttribute });

  type = input<'submit' | 'reset' | 'button'>();

  loading = input<boolean>();
}
