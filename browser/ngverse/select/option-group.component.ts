import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-option-group',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="option-group-label">
      {{ label() }}
      <ng-content select="app-option-group-label"> </ng-content>
    </div>
    <ng-content select="app-option"></ng-content>
  `,
  styles: `
    :host {
      display: block;
      .option-group-label {
        padding: 10px 12px;
        font-size: 14px;
      }
    }
  `,
})
export class OptionGroupComponent {
  label = input<string>();
}
