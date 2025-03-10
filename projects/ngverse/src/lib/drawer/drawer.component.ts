import { ButtonComponent } from '@/ui/button/button.component';
import {
  animate,
  AnimationEvent,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ComponentType } from '@angular/cdk/portal';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { matClose } from '@ng-icons/material-icons/baseline';
import { Subject } from 'rxjs';
import { DrawerCloseDirective } from './drawer-close.directive';

@Component({
  selector: 'app-drawer',
  imports: [DrawerCloseDirective, NgIcon, ButtonComponent, NgComponentOutlet],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
  animations: [
    trigger('toggle', [
      transition('* => enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
      transition('* => exit', [
        animate(
          '200ms ease-in',
          style({ transform: 'translateX(100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
  host: {
    '[@toggle]': 'animationState()',
    '(@toggle.done)': 'onDone($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent {
  title = signal<string | undefined>(undefined);
  animationState = signal<'enter' | 'exit'>('enter');
  component!: ComponentType<unknown>;
  private _onExit = new Subject<void>();
  onExit = this._onExit.asObservable();
  CLOSE_ICON = matClose;

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
