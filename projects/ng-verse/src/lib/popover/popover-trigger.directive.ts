import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appPopoverTrigger]',
  exportAs: 'appPopoverTrigger',
})
export class PopoverTriggerDirective {
  host = inject<ElementRef<HTMLElement>>(ElementRef);
  get hostElement() {
    return this.host.nativeElement;
  }
}
