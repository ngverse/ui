import { animate, style, transition, trigger } from '@angular/animations';
import { ComponentType } from '@angular/cdk/portal';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DrawerCloseIconComponent } from '../drawer-close-icon.component';
import { DrawerCloseDirective } from '../drawer-close.directive';

@Component({
  selector: 'app-drawer',
  imports: [DrawerCloseIconComponent, DrawerCloseDirective, NgComponentOutlet],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  animations: [
    trigger('slideRightLeftAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
  host: {
    '[@slideRightLeftAnimation]': '',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent {
  title = signal<string | undefined>(undefined);

  component!: ComponentType<unknown>;
}
