import { OverlayRef } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';
export const DRAWER_DATA = new InjectionToken<unknown>('DRAWER_DATA');
export class DrawerRef {
  private overlayRef: OverlayRef | null = null;
  private _closed = new Subject<unknown>();

  constructor(overlayRef: OverlayRef | null) {
    this.overlayRef = overlayRef;
  }

  closed() {
    return this._closed.asObservable();
  }

  close(value?: unknown) {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
      this._closed.next(value);
      this._closed.complete();
    }
  }
}
