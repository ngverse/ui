import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  template: ``,
  host: {
    class: 'animate-pulse block bg-mute',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {}
