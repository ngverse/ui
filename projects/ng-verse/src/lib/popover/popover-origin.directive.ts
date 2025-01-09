import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

export type TRIGGER_EVENT = 'hover' | 'focus' | 'click';

@Directive({
  selector: '[appPopoverOrigin]',
  exportAs: 'appPopoverOrigin',
})
export class PopoverOriginDirective {
  host = inject<ElementRef<HTMLElement>>(ElementRef);

  triggerEvent = input<TRIGGER_EVENT>('click');

  eventSub: Subscription | undefined;

  openPopover = output();

  get el() {
    return this.host.nativeElement;
  }

  constructor() {
    effect(() => {
      const event = this.triggerEvent();
      this.eventSub?.unsubscribe();
      this.eventSub = new Subscription();

      switch (event) {
        case 'click':
          this.eventSub.add(
            fromEvent(this.el, 'click').subscribe(() => {
              this.openPopover.emit();
            })
          );
          break;
      }
    });
  }
}
