import {
  animate,
  AnimationEvent,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ComponentType } from '@angular/cdk/portal';
import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { DrawerCloseIconComponent } from './drawer-close-icon.component';
import { DrawerCloseDirective } from './drawer-close.directive';

@Component({
  selector: 'app-drawer',
  imports: [DrawerCloseIconComponent, DrawerCloseDirective, NgComponentOutlet],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  animations: [
    trigger('toggle', [
      transition('* => opening', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
      transition('* => closing', [
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
  animationState = signal<'opening' | 'closing'>('opening');
  component!: ComponentType<unknown>;
  closingFinished = output();

  onDone($event: AnimationEvent) {
    if ($event.toState === 'closing') {
      this.closingFinished.emit();
    }
  }

  startExitAnimation() {
    this.animationState.set('closing');
  }
}
