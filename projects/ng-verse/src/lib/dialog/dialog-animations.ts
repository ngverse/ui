import {
  animate,
  animation,
  group,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const DIALOG_ENTER_ANIMATION = trigger('dialogEnter', [
  transition(':enter', [
    animation(
      group([
        animate(
          '150ms 0ms',
          keyframes([
            style({ opacity: 0, easing: 'ease', offset: 0 }),
            style({ opacity: 1, easing: 'ease', offset: 0.5 }),
            style({ opacity: 1, easing: 'ease', offset: 1 }),
          ])
        ),
        animate(
          '150ms 0ms',
          keyframes([
            style({
              visibility: 'visible',
              transform: 'scale3d(0.3, 0.3, 0.3)',
              easing: 'ease',
              offset: 0,
            }),
            style({ transform: 'scale3d(1, 1, 1)', easing: 'ease', offset: 1 }),
          ])
        ),
      ])
    ),
  ]),
]);
