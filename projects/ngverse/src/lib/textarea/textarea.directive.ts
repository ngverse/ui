import { Directive } from '@angular/core';

@Directive({
  selector: 'textarea[appTextarea]',
  host: {
    class:
      'border focus-visible:outline-ring focus-visible:outline border-border rounded-md py-1.5 px-2.5 bg-background [.ng-invalid.ng-touched]:border-danger disabled:bg-disabled disabled:text-disabled-foreground read-only:bg-disabled read-only:text-disabled-foreground',
  },
})
export class TextareaDirective {}
