import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-multi-option-group',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="px-3 py-2.5 text-sm">
      {{ label() }}
      <ng-content select="app-multi-option-group-label"> </ng-content>
    </div>
    <ng-content select="app-multi-option"></ng-content>
  `,
  host: {
    class: 'block',
  },
})
export class MultiOptionGroupComponent {
  label = input<string>();
}
