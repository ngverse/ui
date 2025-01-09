import { FocusMonitor } from '@angular/cdk/a11y';
import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  NgZone,
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

  focusMonitor = inject(FocusMonitor);

  ngZone = inject(NgZone);

  closePopover = output();

  togglePopover = output();

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
              this.togglePopover.emit();
            })
          );
          break;
        case 'focus':
          this.eventSub.add(
            this.focusMonitor.monitor(this.el).subscribe((origin) => {
              if (!origin) {
                this.ngZone.run(() => this.closePopover.emit());
              } else {
                this.ngZone.run(() => {
                  this.openPopover.emit();
                });
              }
            })
          );
      }
    });
  }
}
