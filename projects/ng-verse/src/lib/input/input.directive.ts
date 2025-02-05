import { Directive } from '@angular/core';

@Directive({
  selector: 'input[appInput]',
  host: {
    '[class.app-input]': 'true',
  },
})
export class InputDirective {}
