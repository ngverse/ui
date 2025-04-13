import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fadeInOnEnter, fadeOutOnLeave } from '@ngverse/motion/animatecss';

@Component({
  selector: 'app-error',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInOnEnter({ duration: 250 }),
    fadeOutOnLeave({ duration: 250 }),
  ],
  host: {
    '[@fadeInOnEnter]': 'true',
    '[@fadeOutOnLeave]': 'true',
    class: 'text-sm text-danger',
  },
})
export class ErrorComponent {}
