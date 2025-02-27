import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { POPOVER_POSITION } from './popover-types';
import { popoverPositionToGlobalPosition } from './popover-utils';

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
}
