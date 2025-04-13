import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-option-group',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="px-3 py-2.5 text-sm">
      {{ label() }}
      <ng-content select="app-option-group-label"> </ng-content>
    </div>
    <ng-content select="app-option"></ng-content>
  `,
  host: {
    class: 'block',
  },
})
export class OptionGroupComponent {
  label = input<string>();
}
