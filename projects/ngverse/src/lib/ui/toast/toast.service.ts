import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { Subject, take } from 'rxjs';
import { ToastComponent } from './toast.component';

export type TOAST_POSITION =
  | 'top_left'
  | 'top_center'
  | 'top_right'
  | 'right_center'
  | 'right_bottom'
  | 'bottom_center'
  | 'bottom_left'
  | 'left_center';

export type TOAST_TYPE = 'success' | 'warning' | 'danger' | undefined;

interface ToastOptions {
  closeDelay?: number;
  autoClose?: boolean;
  showCloseIcon?: boolean;
  message: string;
  type?: TOAST_TYPE;
  position?: TOAST_POSITION;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private overlay = inject(Overlay);
  private overlayRef: OverlayRef | undefined;
  private timeoutId: unknown;

  private resolvePosition(position: TOAST_POSITION) {
    const positionStrategy = this.overlay.position().global();
    const offset = '20px';
    switch (position) {
      case 'top_left':
        return positionStrategy.top(offset).left(offset);
      case 'top_center':
        return positionStrategy.top(offset).centerHorizontally(offset);
      case 'top_right':
        return positionStrategy.top(offset).right(offset);
      case 'right_center':
        return positionStrategy.right(offset).centerVertically(offset);
      case 'right_bottom':
        return positionStrategy.right(offset).bottom(offset);
      case 'bottom_center':
        return positionStrategy.bottom(offset).centerHorizontally(offset);
      case 'bottom_left':
        return positionStrategy.bottom(offset).left(offset);
      case 'left_center':
        return positionStrategy.left(offset).centerVertically();
    }
  }

  open(options: ToastOptions) {
    this.close();

    const portal = new ComponentPortal(ToastComponent);
    // const genOptions = this.getOptions(options);
    const position = options.position ?? 'bottom_center';
    const showCloseIcon = options.showCloseIcon ?? true;
    const closeDelay = options.closeDelay ?? 3000;
    const autoClose = options.autoClose ?? true;
    const message = options.message;
    const type = options.type ?? undefined;

    const globalPosition = this.resolvePosition(position);

    this.overlayRef = this.overlay.create({
      positionStrategy: globalPosition,
    });
    const compRef = this.overlayRef.attach(portal);
    const instance = compRef.instance;
    instance.message.set(message);
    instance.type.set(type);
    instance.showCloseIcon.set(showCloseIcon);
    instance.position.set(position);
    if (autoClose) {
      this.timeoutId = setTimeout(() => {
        instance.exit();
      }, closeDelay);
    }

    instance.onExit.subscribe(() => {
      this.close();
    });
    const closed$ = new Subject<void>();

    return closed$.pipe(take(1));
  }

  private close() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId as number);
      this.timeoutId = undefined;
    }
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
  }
}
