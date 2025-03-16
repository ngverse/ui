import { AnimationEvent, transition, trigger } from '@angular/animations';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { zoomIn, zoomOut } from '@ngverse/motion/animatecss';
import { Subject } from 'rxjs';
import { ToastCloseIconComponent } from './toast-close.component';
import { TOAST_POSITION } from './toast.service';

@Component({
  selector: 'app-toast',
  imports: [ToastCloseIconComponent, NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toggle', [
      transition('* => enter', [zoomIn({ duration: 250 })]),
      transition('* => exit', [zoomOut({ duration: 250 })]),
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
  type = signal<string | undefined>(undefined);
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
