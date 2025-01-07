import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type RESIZE_TYPES =
  | 'none'
  | 'both'
  | 'horizontal'
  | 'vertical'
  | 'block'
  | 'inline';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[appTextarea]',
  imports: [],
  template: ``,
  host: {
    '[style.resize]': 'resize()',
  },
  styleUrl: './textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  resize = input<RESIZE_TYPES>('none');
}
