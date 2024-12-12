import { animate, style, transition, trigger } from '@angular/animations';
import { Component, computed, inject, output, signal } from '@angular/core';
import { ToastCloseIconComponent } from './toast-close.component';
import { NgClass } from '@angular/common';
import { TOAST_ANIMATIONS } from './toast-animations';
import { TOAST_POSITION } from './toast.service';
import { OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-toast',
  imports: [ToastCloseIconComponent, NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  animations: [TOAST_ANIMATIONS],
})
export class ToastComponent {
  message = signal<string>('');
  action = signal<string>('');
  showCloseIcon = signal<boolean>(true);
  tooltipPosition = signal<TOAST_POSITION>('right_bottom');
  close = output();

  animationState = computed(() => {
    switch (this.tooltipPosition()) {
      case 'top_left':
      case 'top_center':
      case 'top_right':
        return 'top';
      case 'right_bottom':
      case 'bottom_center':
      case 'bottom_left':
        return 'bottom';
      case 'right_center':
        return 'right';
      case 'left_center':
        return 'left';
    }
  });
}
