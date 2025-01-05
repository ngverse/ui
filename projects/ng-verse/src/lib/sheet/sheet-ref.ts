import { Injectable } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

@Injectable()
export class SheetRef {
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
