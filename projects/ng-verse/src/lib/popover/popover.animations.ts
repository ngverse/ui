import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const POPOVER_ANIMATIONS = trigger('popoverAnimations', [
  state('void', style({ opacity: 0, transform: 'scale(0.9)' })), // Initial state
  state('show', style({ opacity: 1, transform: 'scale(1)' })), // Final state when open
  state('hide', style({ opacity: 0, transform: 'scale(0.9)' })), // Final state when closing
  transition('void => show', [animate('150ms ease-out')]), // Enter animation
  transition('enter => hide', [animate('150ms ease-in')]), // Leave animation
]);
