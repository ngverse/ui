import { animate, style, transition, trigger } from '@angular/animations';
import { Component, signal } from '@angular/core';
import { ToastCloseIconComponent } from './toast-close.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [ToastCloseIconComponent, NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ transform: 'translateX(200px)' }), // Initial state
        animate('250ms ease-in', style({ transform: 'translateX(0)' })), // End state
      ]),
    ]),
  ],
})
export class ToastComponent {
  message = signal<string>('');
  action = signal<string>('');
  showCloseIcon = signal<boolean>(true);
}
