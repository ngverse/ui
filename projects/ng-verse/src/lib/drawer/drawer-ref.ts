import { OverlayRef } from '@angular/cdk/overlay';
import { Injectable, InjectionToken } from '@angular/core';
export const DRAWER_DATA = new InjectionToken<unknown>('DRAWER_DATA');
@Injectable()
export class DrawerRef {
  private overlayRef: OverlayRef | null = null;

  constructor(overlayRef: OverlayRef | null) {
    this.overlayRef = overlayRef;
  }

  close() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }
}
