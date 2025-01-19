import { Directive, ElementRef, inject } from '@angular/core';

export type TRIGGER_EVENT = 'hover' | 'focus' | 'click';

@Directive({
  selector: '[appPopoverOrigin]',
  exportAs: 'appPopoverOrigin',
})
export class PopoverOriginDirective {
  host = inject<ElementRef<HTMLElement>>(ElementRef);
  get el() {
    return this.host.nativeElement;
  }
}
