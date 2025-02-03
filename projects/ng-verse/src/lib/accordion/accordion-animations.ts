import {
  animate,
  animation,
  AUTO_STYLE,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const EXPAND_ON_ENTER_ANIMATION = trigger('expandOnEnter', [
  transition(':enter', [
    animation(
      animate(
        '150ms',
        keyframes([
          style({
            height: '0',
            visibility: 'hidden',
            overflow: 'hidden',
            easing: 'ease-out',
            offset: 0,
          }),
          style({
            height: AUTO_STYLE,
            visibility: AUTO_STYLE,
            overflow: 'hidden',
            easing: 'ease-out',
            offset: 1,
          }),
        ])
      )
    ),
  ]),
]);
export const COLLAPSE_ON_LEAVE = trigger('collapseOnLeave', [
  transition(':leave', [
    animation(
      animate(
        '150ms',
        keyframes([
          style({
            height: AUTO_STYLE,
            visibility: AUTO_STYLE,
            overflow: 'hidden',
            easing: 'ease-in',
            offset: 0,
          }),
          style({
            height: '0',
            visibility: 'hidden',
            overflow: 'hidden',
            easing: 'ease-in',
            offset: 1,
          }),
        ])
      )
    ),
  ]),
]);
