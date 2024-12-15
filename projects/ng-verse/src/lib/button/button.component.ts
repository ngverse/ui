import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type COLOR_TYPES = 'primary' | 'secondary' | 'danger' | 'success';

type VARIANT_TYPES = 'fill' | 'outline';

type SIZE_TYPES = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  color = input<COLOR_TYPES>('primary');

  variant = input<VARIANT_TYPES>('fill');

  disabled = input<boolean>();

  type = input<'submit' | 'reset' | 'button'>();

  size = input<SIZE_TYPES>('md');

  loading = input<boolean>();
}
