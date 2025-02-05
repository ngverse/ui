import { Directive, input } from '@angular/core';

export type TEXTAREA_RESIZE_TYPES =
  | 'none'
  | 'both'
  | 'horizontal'
  | 'vertical'
  | 'block'
  | 'inline';

@Directive({
  selector: 'textarea[appTextarea]',
  host: {
    '[style.resize]': 'resize()',
    '[class.app-textarea]': 'true',
  },
})
export class TextareaDirective {
  resize = input<TEXTAREA_RESIZE_TYPES>('none');
}
