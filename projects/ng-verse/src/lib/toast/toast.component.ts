import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { ToastCloseIconComponent } from './toast-close.component';
import { TOAST_POSITION } from './toast.service';

const EXIT_ANIMATION = '_toast-exit';

@Component({
  selector: 'app-toast',
  imports: [ToastCloseIconComponent],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'alert',
    '[class.toaster]': 'true',
    '[class.toast-enter]': "_animationState() === 'enter'",
    '[class.toast-exit]': "_animationState() === 'exit'",
    '[class]': 'type()',
    '(animationend)': 'onAnimationEnd($event.animationName)',
    '(animationcancel)': 'onAnimationEnd($event.animationName)',
  },
})
export class ToastComponent {
  message = signal<string>('');
  type = signal<string>('');
  showCloseIcon = signal<boolean>(true);
  position = signal<TOAST_POSITION>('right_bottom');
  _animationState = signal<'void' | 'enter' | 'exit'>('void');
  _exitCompleted = output<void>();

  onAnimationEnd(animationName: string) {
    if (animationName === EXIT_ANIMATION) {
      this._exitCompleted.emit();
    }
  }

  enter() {
    this._animationState.set('enter');
  }

  exit() {
    this._animationState.set('exit');
  }
}
