import { ChangeDetectionStrategy, Component, input } from '@angular/core';

const minMaxTransform = (value: number) => {
  if (value < 0) {
    return 0;
  }
  if (value > 100) {
    return 100;
  }
  return value;
};

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  value = input(0, { transform: minMaxTransform });
  indeterminate = input<boolean>(false);

  transformValue() {
    return `scaleX(${this.value()}%)`;
  }
}
