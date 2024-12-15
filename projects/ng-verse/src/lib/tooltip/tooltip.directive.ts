import { FocusMonitor } from '@angular/cdk/a11y';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
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
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { filter, fromEvent, merge, Subscription } from 'rxjs';
import { TooltipContainerComponent } from '../tooltip-container/tooltip-container.component';
export type TOOLTIP_POSITIONS = 'top' | 'right' | 'bottom' | 'left';

export type TOOLTIP_EVENT = 'hover' | 'focus' | 'both';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements AfterViewInit, OnDestroy {
  message = input.required<string>({ alias: 'appTooltip' });
  tooltipPosition = input<TOOLTIP_POSITIONS>('top');
  tooltipEvent = input<TOOLTIP_EVENT>('both');
  focusMonitor = inject(FocusMonitor);
  ngZone = inject(NgZone);
  overlay = inject(Overlay);
  overlayRef: OverlayRef | undefined;
  tooltipDelay = input(0, { transform: numberAttribute });
  timeoutId: unknown | undefined;

  componentRef: ComponentRef<TooltipContainerComponent> | undefined;

  el = inject<ElementRef<HTMLElement>>(ElementRef);
  sub = new Subscription();

  tooltipContent = input<TemplateRef<unknown>>();
  vf = inject(ViewContainerRef);

  ngAfterViewInit(): void {
    this.focusListener();
    this.mouseListener();
  }

  private focusListener() {
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
          if (!origin) {
            this.ngZone.run(() => this.hide());
          } else {
            this.ngZone.run(() => {
              this.show();
            });
          }
        })
    );
  }

  private mouseListener() {
    const filter$ = filter(
      () => this.tooltipEvent() === 'both' || this.tooltipEvent() === 'hover'
    );
    this.sub.add(
      fromEvent(this.el.nativeElement, 'mouseenter')
        .pipe(filter$)
        .subscribe(() => {
          this.show();
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

  protected getOverlayPosition(): ConnectedPosition {
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

  protected clearSchedule() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId as number);
      this.timeoutId = undefined;
    }
  }

  show() {
    this.clearSchedule();

    this.timeoutId = setTimeout(() => {
      const originElement = this.el.nativeElement;
      const tooltipContent = this.tooltipContent();
      const portal = new ComponentPortal(TooltipContainerComponent);

      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .flexibleConnectedTo(originElement)
          .withPositions([this.getOverlayPosition()]),
      });
      this.componentRef = this.overlayRef.attach(portal);
      this.componentRef.instance.content.set(tooltipContent);
      this.componentRef.instance.message.set(this.message());
      this.componentRef.instance.position.set(this.tooltipPosition());
    }, this.tooltipDelay()) as unknown;
  }

  hide() {
    this.clearSchedule();
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
      this.overlayRef = undefined;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.clearSchedule();
  }
}
