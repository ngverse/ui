import { Directive } from '@angular/core';

@Directive({
  selector: 'input[appInput]',
  host: {
    '[class.input]': 'true',
  },
})
export class InputDirective {}
