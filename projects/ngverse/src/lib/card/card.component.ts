import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.surface]': 'surface()',
    '[class.outline]': 'outline()',
    '[class.shadow]': 'shadow()',
    '[class.gap]': 'gap()',
  },
})
export class CardComponent {
  surface = input(false);
  outline = input(true);
  shadow = input(false);
  gap = input(true);
}
