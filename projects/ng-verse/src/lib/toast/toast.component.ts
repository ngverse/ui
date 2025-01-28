import { AnimationEvent } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  output,
  signal,
} from '@angular/core';
import { TOAST_ANIMATIONS } from './toast-animations';
import { ToastCloseIconComponent } from './toast-close.component';
import { TOAST_POSITION } from './toast.service';

@Component({
  selector: 'app-toast',
  imports: [ToastCloseIconComponent],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  animations: [TOAST_ANIMATIONS],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  message = signal<string>('');
  action = signal<string>('');
  showCloseIcon = signal<boolean>(true);
  position = signal<TOAST_POSITION>('right_bottom');
  animationState = signal<'show' | 'hide'>('show');

  closeAnimationFinished = output();

  animationParams = computed(() => {
    const isShowing = this.animationState() === 'show';
    function getAnimation(
      start: { x?: string; y?: string },
      end: { x?: string; y?: string }
    ) {
      const startX = start.x || 0;
      const startY = start.y || 0;
      const endX = end.x || 0;
      const endY = end.y || 0;

      if (isShowing) {
        return {
          value: 'show',
          params: {
            startTransform: `translate(${startX}, ${startY})`,
            endTransform: `translate(${endX}, ${endY})`,
          },
        };
      }
      return {
        value: 'hide',
        params: {
          startTransform: `translate(${endX}, ${endY})`,
          endTransform: `translate(${startX}, ${startY})`,
        },
      };
    }

    switch (this.position()) {
      case 'top_left':
      case 'top_center':
      case 'top_right':
        return getAnimation(
          {
            y: '-100%',
          },
          {
            y: '0',
          }
        );
      case 'right_bottom':
      case 'bottom_center':
      case 'bottom_left':
        return getAnimation(
          {
            y: '100%',
          },
          {
            y: '0',
          }
        );
      case 'right_center':
        return getAnimation(
          {
            x: '100%',
          },
          {
            x: '0',
          }
        );
      case 'left_center':
        return getAnimation(
          {
            x: '-100%',
          },
          {
            x: '0',
          }
        );
    }
  });

  onDone($event: AnimationEvent) {
    if ($event.toState === 'hide') {
      this.closeAnimationFinished.emit();
    }
  }

  startCloseAnimation() {
    this.animationState.set('hide');
  }
}
