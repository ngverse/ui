import { Component, signal } from '@angular/core';
import { ProgressBarComponent } from '../../../../../ng-verse/src/lib/progress-bar/progress-bar.component';

@Component({
  selector: 'exp-show-case-progress-bar',
  imports: [ProgressBarComponent],
  templateUrl: './show-case-progress-bar.component.html',
  styleUrl: './show-case-progress-bar.component.scss',
})
export class ShowCaseProgressBarComponent {
  value = signal<number>(0);

  constructor() {
    setInterval(() => {
      this.value.update((val) => val + 1);
    }, 100);
  }
}
