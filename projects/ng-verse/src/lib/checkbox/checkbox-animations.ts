import { animate, style, transition, trigger } from '@angular/animations';

export const CHECKBOX_ANIMATION = trigger('toggle', [
  transition('* => *', [
    style({ opacity: 0 }),
    animate('150ms', style({ opacity: 1 })),
  ]),
]);
