import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-multi-option-group-label',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiOptionGroupLabelComponent {}
