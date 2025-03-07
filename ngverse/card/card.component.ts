import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.surface]': 'surface()',
    '[class.outlined]': 'outlined()',
    '[class.shadow]': 'shadow()',
    '[class.gap]': 'gap()',
  },
})
export class CardComponent {
  surface = input(false);
  outlined = input(true);
  shadow = input(false);
  gap = input(true);
}
