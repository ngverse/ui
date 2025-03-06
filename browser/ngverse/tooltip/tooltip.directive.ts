import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  inject,
  input,
  numberAttribute,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { TooltipContainerComponent } from './tooltip-container.component';
export type TOOLTIP_POSITIONS = 'top' | 'right' | 'bottom' | 'left';

export type TOOLTIP_EVENT = 'hover' | 'focus';

let tooltipId = 0;

function getTooltipId() {
  return `tooltip-${tooltipId++}`;
}

@Directive({
  selector: '[appTooltip]',
  host: {
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '[attr.aria-describedby]': 'tooltipId',
  },
})
export class TooltipDirective implements OnDestroy {
  message = input.required<string>({ alias: 'appTooltip' });
  tooltipPosition = input<TOOLTIP_POSITIONS>('top');
  tooltipEvent = input<TOOLTIP_EVENT>('hover');
  tooltipDelay = input(0, { transform: numberAttribute });
  tooltipContent = input<TemplateRef<unknown>>();
  tooltipId = getTooltipId();

  private overlay = inject(Overlay);
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private document = inject(DOCUMENT);

  overlayRef: OverlayRef | undefined;
  timeoutId: unknown | undefined;
  escapeSub: Subscription | undefined;

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
      const componentRef = this.overlayRef.attach(portal);
      componentRef.instance.content.set(tooltipContent);
      componentRef.instance.message.set(this.message());
      componentRef.instance.position.set(this.tooltipPosition());
      componentRef.instance.id.set(this.tooltipId);
      this.listenToEscape();
    }, this.tooltipDelay()) as unknown;
  }

  hide() {
    this.escapeSub?.unsubscribe();
    this.clearSchedule();
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
      this.overlayRef = undefined;
    }
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

  private clearSchedule() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId as number);
      this.timeoutId = undefined;
    }
  }

  private listenToEscape() {
    this.escapeSub?.unsubscribe();
    this.escapeSub = fromEvent<KeyboardEvent>(
      this.document,
      'keydown'
    ).subscribe((event) => {
      if (event.key === 'Escape') {
        this.hide();
      }
    });
  }

  ngOnDestroy(): void {
    this.clearSchedule();
    this.escapeSub?.unsubscribe();
  }
}
