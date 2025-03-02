import { ConnectedPosition, Overlay } from '@angular/cdk/overlay';
import { POPOVER_POSITION } from './popover-types';

export function popoverPositionToConnectionPosition(
  position: POPOVER_POSITION,
  offsetX?: number,
  offsetY?: number
): ConnectedPosition {
  switch (position) {
    case 'top':
      return {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetX: offsetX,
        offsetY: offsetY,
      };
    case 'right':
      return {
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center',
        offsetX: offsetX,
        offsetY: offsetY,
      };
    case 'bottom':
      return {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        offsetX: offsetX,
        offsetY: offsetY,
      };
    case 'left':
      return {
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center',
        offsetX: offsetX,
        offsetY: offsetY,
      };
    case 'bottom-end':
      return {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetX: offsetX,
        offsetY: offsetY,
      };
    case 'bottom-start':
      return {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
        offsetX: offsetX,
        offsetY: offsetY,
      };
    case 'left-end':
      return {
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center',
        offsetX: offsetX,
        offsetY: offsetY,
      };
    case 'left-start':
      return {
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center',
        offsetX: offsetX,
        offsetY: offsetY,
      };
    case 'right-end':
      return {
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center',
        offsetX: offsetX,
        offsetY: offsetY,
      };
    case 'right-start':
      return {
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center',
        offsetX: offsetX,
        offsetY: offsetY,
      };
    case 'top-end':
      return {
        originX: 'end',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetX: offsetX,
        offsetY: offsetY,
      };
    case 'top-start':
      return {
        originX: 'start',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
        offsetX: offsetX,
        offsetY: offsetY,
      };
  }
}

export function popoverPositionToGlobalPosition(
  position: POPOVER_POSITION,
  overlay: Overlay,
  offsetX?: number,
  offsetY?: number
) {
  let globalPosition = overlay.position().global();

  if (
    position === 'bottom' ||
    position === 'bottom-end' ||
    position === 'bottom-start'
  ) {
    globalPosition = globalPosition.bottom(`${offsetY}px`);
  }
  if (
    position === 'top' ||
    position === 'top-end' ||
    position === 'top-start'
  ) {
    globalPosition = globalPosition.top(`${offsetY}px`);
  }

  if (position === 'bottom-start' || position === 'top-start') {
    globalPosition = globalPosition.left(`${offsetX}px`);
  }

  if (position === 'bottom-end' || position === 'top-end') {
    globalPosition = globalPosition.right(`${offsetX}px`);
  }

  return globalPosition;
}
