import { ButtonComponent } from '@/ui/button/button.component';
import { AnimationEvent, transition, trigger } from '@angular/animations';
import { ComponentType } from '@angular/cdk/portal';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { slideInRight, slideOutRight } from '@ngverse/motion/animatecss';
import { Subject } from 'rxjs';
import { FontIconComponent } from '../icon/font-icon.component';
import { DrawerCloseDirective } from './drawer-close.directive';

@Component({
  selector: 'app-drawer',
  imports: [
    DrawerCloseDirective,
    ButtonComponent,
    NgComponentOutlet,
    FontIconComponent,
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
  animations: [
    trigger('toggle', [
      transition('* => enter', [slideInRight({ duration: 250 })]),
      transition('* => exit', [slideOutRight({ duration: 250 })]),
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
