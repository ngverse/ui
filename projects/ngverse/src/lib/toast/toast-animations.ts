import {
  animate,
  animation,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const TOAST_ANIMATIONS = trigger('slide', [
  transition('* => show', [
    animation([
      animate(
        '250ms 0ms',
        keyframes([
          style({
            opacity: 0,
            transform: '{{startTransform}}',
          }),
          style({
            transform: '{{endTransform}}',
            opacity: 1,
          }),
        ])
      ),
    ]),
  ]),
  transition('* => hide', [
    animation([
      animate(
        '250ms 0ms',
        keyframes([
          style({
            opacity: 1,
            transform: '{{startTransform}}',
          }),
          style({
            transform: '{{endTransform}}',
            opacity: 0,
          }),
        ])
      ),
    ]),
  ]),
]);
