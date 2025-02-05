import {
  animate,
  AnimationEvent,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastCloseIconComponent } from './toast-close.component';
import { TOAST_POSITION } from './toast.service';

@Component({
  selector: 'app-toast',
  imports: [ToastCloseIconComponent],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toggle', [
      transition('* => enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('150ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
      transition('* => exit', [
        animate('150ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
  host: {
    role: 'alert',
    '[class.toaster]': 'true',
    '[class]': 'type()',
    '[@toggle]': 'animationState()',
    '(@toggle.done)': 'onDone($event)',
  },
})
export class ToastComponent {
  message = signal<string>('');
  type = signal<string>('');
  showCloseIcon = signal<boolean>(true);
  position = signal<TOAST_POSITION>('right_bottom');
  animationState = signal<'enter' | 'exit'>('enter');
  private _onExit = new Subject<void>();
  onExit = this._onExit.asObservable();

  onDone($event: AnimationEvent) {
    if ($event.toState === 'exit') {
      this._onExit.next();
      this._onExit.complete();
    }
  }

  exit() {
    this.animationState.set('exit');
  }
}
