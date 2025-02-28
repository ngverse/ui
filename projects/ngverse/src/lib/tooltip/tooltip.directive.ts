import { OverlayRef } from '@angular/cdk/overlay';
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
import { POPOVER_POSITION, PopoverService } from '@ngverse/kit';
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
  tooltipPosition = input<POPOVER_POSITION>('top');
  tooltipEvent = input<TOOLTIP_EVENT>('hover');
  tooltipDelay = input(0, { transform: numberAttribute });
  tooltipContent = input<TemplateRef<unknown>>();
  tooltipId = getTooltipId();

  private popoverService = inject(PopoverService);

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

      if (this.overlayRef) {
        return;
      }

      this.overlayRef = this.popoverService.connected({
        component: portal,
        origin: originElement,
        position: this.tooltipPosition(),
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
