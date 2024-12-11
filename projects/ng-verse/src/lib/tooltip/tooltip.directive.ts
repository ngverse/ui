import { FocusMonitor } from '@angular/cdk/a11y';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  ComponentRef,
  Directive,
  ElementRef,
  inject,
  input,
  NgZone,
  numberAttribute,
  OnDestroy,
  signal,
} from '@angular/core';
import { filter, fromEvent, merge, Subscription } from 'rxjs';
import { TooltipMessageContainerComponent } from '../tooltip-message-container/tooltip-message-container.component';

type TOOLTIP_POSITIONS = 'top' | 'right' | 'bottom' | 'left';

type TOOLTIP_EVENT = 'hover' | 'focus' | 'both';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements AfterViewInit, OnDestroy {
  message = input.required<string>({ alias: 'appTooltip' });
  focusMonitor = inject(FocusMonitor);
  ngZone = inject(NgZone);
  overlay = inject(Overlay);
  overlayRef: OverlayRef | undefined;
  componentRef: ComponentRef<TooltipMessageContainerComponent> | undefined;

  el = inject<ElementRef<HTMLElement>>(ElementRef);
  sub = new Subscription();
  tooltipPosition = input<TOOLTIP_POSITIONS>('top');
  tooltipEvent = input<TOOLTIP_EVENT>('both');
  tooltipDelay = input(0, { transform: numberAttribute });
  timeoutId: unknown | undefined;

  ngAfterViewInit(): void {
    this.sub.add(
      this.focusMonitor
        .monitor(this.el.nativeElement)
        .pipe(
          filter(
            () =>
              this.tooltipEvent() === 'both' || this.tooltipEvent() === 'focus'
          )
        )
        .subscribe((origin) => {
          //Null means blur event
          if (!origin) {
            this.ngZone.run(() => this.hide());
          } else {
            this.ngZone.run(() => {
              this.show();
            });
          }
        })
    );
    const filter$ = filter(
      () => this.tooltipEvent() === 'both' || this.tooltipEvent() === 'hover'
    );
    this.sub.add(
      fromEvent(this.el.nativeElement, 'mouseenter')
        .pipe(filter$)
        .subscribe(() => {
          if (
            this.tooltipEvent() === 'both' ||
            this.tooltipEvent() === 'hover'
          ) {
            this.show();
          }
        })
    );

    this.sub.add(
      fromEvent<MouseEvent>(this.el.nativeElement, 'mouseleave')
        .pipe(filter$)
        .subscribe(() => {
          this.hide();
        })
    );
  }

  private getOverlayPosition(): ConnectedPosition {
    const offset = 6;
    const tooltipPosition = this.tooltipPosition();
    switch (tooltipPosition) {
      case 'top':
        return {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -offset,
        };
      case 'right':
        return {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
          offsetX: offset,
        };
      case 'bottom':
        return {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: offset,
        };
      case 'left':
        return {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
          offsetX: -offset,
        };
    }
  }

  show() {
    this.clearSchedule();

    this.timeoutId = setTimeout(() => {
      const originElement = this.el.nativeElement;
      const portal = new ComponentPortal(TooltipMessageContainerComponent);
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .flexibleConnectedTo(originElement)
          .withPositions([this.getOverlayPosition()]),
      });
      this.componentRef = this.overlayRef.attach(portal);
      this.componentRef.instance.message.set(this.message());
      this.componentRef.instance.position.set(this.tooltipPosition());
    }, this.tooltipDelay()) as unknown;
  }

  hide() {
    this.clearSchedule();
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  clearSchedule() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId as number);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.clearSchedule();
  }
}
