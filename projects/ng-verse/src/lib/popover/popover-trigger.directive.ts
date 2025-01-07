import { FocusMonitor } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  inject,
  input,
  NgZone,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

export type TRIGGER_EVENT = 'click' | 'focus' | 'none' | 'hover';

@Directive({
  selector: '[appPopoverTrigger]',
  exportAs: 'appPopoverTrigger',
})
export class PopoverTriggerDirective implements OnInit, OnDestroy {
  host = inject<ElementRef<HTMLElement>>(ElementRef);
  get hostElement() {
    return this.host.nativeElement;
  }

  openTriggered = output();

  closeTriggered = output();

  triggerEvent = input<TRIGGER_EVENT | TRIGGER_EVENT[]>('click');
  sub = new Subscription();

  focusMonitor = inject(FocusMonitor);

  ngZone = inject(NgZone);

  ngOnInit(): void {
    const triggerEvent = this.triggerEvent();
    if (Array.isArray(triggerEvent)) {
      for (const event of triggerEvent) {
        this.listenOnTriggerEvent(event);
      }
    } else {
      this.listenOnTriggerEvent(triggerEvent);
    }
  }

  private listenOnTriggerEvent(triggerEvent: TRIGGER_EVENT) {
    switch (triggerEvent) {
      case 'click':
        this.clickTrigger();
        break;
      case 'focus':
        this.focusTrigger();
        break;
      case 'hover':
        this.hoverTrigger();
        break;
    }
  }

  private clickTrigger() {
    this.sub.add(
      fromEvent(this.hostElement, 'click').subscribe(() => {
        this.openTriggered.emit();
      })
    );
  }

  private hoverTrigger() {
    this.sub.add(
      fromEvent(this.host.nativeElement, 'mouseenter').subscribe(() => {
        this.openTriggered.emit();
      })
    );

    this.sub.add(
      fromEvent<MouseEvent>(this.host.nativeElement, 'mouseleave').subscribe(
        () => {
          this.closeTriggered.emit();
        }
      )
    );
  }

  private focusTrigger() {
    this.sub.add(
      this.focusMonitor.monitor(this.host.nativeElement).subscribe((origin) => {
        if (!origin) {
          this.ngZone.run(() => this.closeTriggered.emit());
        } else {
          this.ngZone.run(() => {
            this.openTriggered.emit();
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
