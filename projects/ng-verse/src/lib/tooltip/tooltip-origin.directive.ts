import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appTooltipDirective]',
  exportAs: 'appTooltipDirective',
})
export class TooltipOriginDirective {
  el = inject(ElementRef);
}
