import { FocusMonitor } from '@angular/cdk/a11y';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
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
import { TooltipContainerComponent } from './tooltip-container/tooltip-container.component';
export type TOOLTIP_POSITIONS = 'top' | 'right' | 'bottom' | 'left';

export type TOOLTIP_EVENT = 'hover' | 'focus';

@Directive({
  selector: '[appTooltip]',
  host: {
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class TooltipDirective implements OnDestroy {
  message = input.required<string>({ alias: 'appTooltip' });
  tooltipPosition = input<TOOLTIP_POSITIONS>('top');
  tooltipEvent = input<TOOLTIP_EVENT>('hover');
  tooltipDelay = input(0, { transform: numberAttribute });
  focusMonitor = inject(FocusMonitor);
  ngZone = inject(NgZone);
  overlay = inject(Overlay);
  overlayRef: OverlayRef | undefined;
  timeoutId: unknown | undefined;

  componentRef: ComponentRef<TooltipContainerComponent> | undefined;

  el = inject<ElementRef<HTMLElement>>(ElementRef);

  tooltipContent = input<TemplateRef<unknown>>();
  vf = inject(ViewContainerRef);

  onFocus() {
    if (this.tooltipEvent() === 'focus') {
      this.show();
    }
  }

  onBlur() {
    if (this.tooltipEvent() === 'focus') {
      this.hide();
    }
  }

  onMouseEnter() {
    if (this.tooltipEvent() === 'hover') {
      this.show();
    }
  }

  onMouseLeave() {
    if (this.tooltipEvent() === 'hover') {
      this.hide();
    }
  }

  getOverlayPosition(): ConnectedPosition {
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
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
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
    this.clearSchedule();
  }
}
