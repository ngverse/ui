import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-option-group',
  imports: [],
  templateUrl: './option-group.component.html',
  styleUrl: './option-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionGroupComponent {
  label = input.required<string>();
}
