import { Directive, ElementRef, inject } from '@angular/core';

export type TRIGGER_EVENT = 'hover' | 'focus' | 'click';

@Directive({
  selector: '[ktPopoverOrigin]',
  exportAs: 'ktPopoverOrigin',
})
export class PopoverOriginDirective {
  host = inject<ElementRef<HTMLElement>>(ElementRef);
  get el() {
    return this.host.nativeElement;
  }
}
