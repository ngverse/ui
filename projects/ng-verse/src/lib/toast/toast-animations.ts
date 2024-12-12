import {
  animate,
  animation,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const TOAST_ANIMATIONS = trigger('slide', [
  transition('* => left', [
    animation([
      animate(
        '250ms 0ms',
        keyframes([
          style({
            visibility: 'visible',
            transform: 'translate3d(-100%, 0, 0)',
            easing: 'ease',
            offset: 0,
          }),
          style({
            transform: 'translate3d(0, 0, 0)',
            easing: 'ease',
            offset: 1,
          }),
        ])
      ),
    ]),
  ]),
  transition('* => right', [
    animation([
      animate(
        '250ms 0ms',
        keyframes([
          style({
            visibility: 'visible',
            transform: 'translate3d(100%, 0, 0)',
            easing: 'ease',
            offset: 0,
          }),
          style({
            transform: 'translate3d(0, 0, 0)',
            easing: 'ease',
            offset: 1,
          }),
        ])
      ),
    ]),
  ]),
  transition('* => top', [
    animation([
      animate(
        '250ms 0ms',
        keyframes([
          style({
            visibility: 'visible',
            transform: 'translate3d(0, -100%, 0)',
            easing: 'ease',
            offset: 0,
          }),
          style({
            transform: 'translate3d(0, 0, 0)',
            easing: 'ease',
            offset: 1,
          }),
        ])
      ),
    ]),
  ]),
  transition('* => bottom', [
    animation([
      animate(
        '250ms 0ms',
        keyframes([
          style({
            visibility: 'visible',
            transform: 'translate3d(0, 100%, 0)',
            easing: 'ease',
            offset: 0,
          }),
          style({
            transform: 'translate3d(0, 0, 0)',
            easing: 'ease',
            offset: 1,
          }),
        ])
      ),
    ]),
  ]),
]);
