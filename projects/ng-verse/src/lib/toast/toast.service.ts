import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { ToastComponent } from './toast.component';
import { Subject, take } from 'rxjs';

type ToastPosition =
  | 'top_left'
  | 'top_center'
  | 'top_right'
  | 'right_center'
  | 'right_bottom'
  | 'bottom_center'
  | 'bottom_left'
  | 'left_center';

interface ToastOptions {
  closeDelay?: number;
  autoClose?: boolean;
  showCloseIcon?: boolean;
  message: string;
  action?: string;
  position?: ToastPosition;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private overlay = inject(Overlay);
  private overlayRef: OverlayRef | undefined;

  private resolvePosition(position: ToastPosition) {
    const positionStrategy = this.overlay.position().global();
    switch (position) {
      case 'top_left':
        return positionStrategy.top().left();
      case 'top_center':
        return positionStrategy.top().centerHorizontally();
      case 'top_right':
        return positionStrategy.top().right();
      case 'right_center':
        return positionStrategy.right('30px').centerVertically();
      case 'right_bottom':
        return positionStrategy.right().bottom();
      case 'bottom_center':
        return positionStrategy.bottom().centerHorizontally();
      case 'bottom_left':
        return positionStrategy.bottom().left();
      case 'left_center':
        return positionStrategy.left().centerHorizontally();
    }
  }

  private getOptions(options: ToastOptions): Required<ToastOptions> {
    return {
      closeDelay: options.closeDelay ?? 3000,
      autoClose: options.autoClose ?? true,
      showCloseIcon: options.showCloseIcon ?? true,
      message: options.message,
      action: options.action || 'default',
      position: options.position ?? 'right_bottom',
    };
  }

  open(options: ToastOptions) {
    this.overlayRef?.detach();

    const portal = new ComponentPortal(ToastComponent);
    const genOptions = this.getOptions(options);
    const position = this.resolvePosition(genOptions.position);
    this.overlayRef = this.overlay.create({
      positionStrategy: position,
    });
    const compRef = this.overlayRef.attach(portal);
    const instance = compRef.instance;
    instance.message.set(genOptions.message);
    instance.action.set(genOptions.action);
    instance.showCloseIcon.set(genOptions.showCloseIcon);

    const closed$ = new Subject();

    return closed$.pipe(take(1));
  }
}
