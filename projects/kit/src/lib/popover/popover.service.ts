import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { ElementRef, inject, Injectable } from '@angular/core';
import { POPOVER_POSITION } from './popover-types';
import {
  popoverPositionToConnectionPosition,
  popoverPositionToGlobalPosition,
} from './popover-utils';

@Injectable({
  providedIn: 'root',
})
export class PopoverService {
  private overlay = inject(Overlay);

  global<T>(options: {
    component: ComponentType<T>;
    position: POPOVER_POSITION;
    offsetX?: number;
    offsetY?: number;
  }) {
    const positionStrategy = popoverPositionToGlobalPosition(
      options.position,
      this.overlay,
      options.offsetX,
      options.offsetY
    );

    const overlayRef = this.overlay
      .create({
        positionStrategy,
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
      })
      .attach(new ComponentPortal(options.component));

    return overlayRef;
  }

  connected<T>(options: {
    component: Portal<T>;
    origin: ElementRef | HTMLElement;
    position: POPOVER_POSITION;
    offsetX?: number;
    offsetY?: number;
    blockScroll?: boolean;
    hasBackdrop?: boolean;
    stretch?: boolean;
  }) {
    const originEl =
      options.origin instanceof ElementRef
        ? options.origin.nativeElement
        : options.origin;

    const scrollStrategy = options.blockScroll
      ? this.overlay.scrollStrategies.block()
      : this.overlay.scrollStrategies.reposition();

    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(originEl)
        .withPositions([
          popoverPositionToConnectionPosition(
            options.position,
            options.offsetX,
            options.offsetY
          ),
        ])
        .withLockedPosition(true),
      hasBackdrop: options.hasBackdrop,
      scrollStrategy: scrollStrategy,
    });

    const componentRef = overlayRef.attach(options.component);
    return { overlayRef, componentRef };
  }
}
