import { Component, signal } from '@angular/core';
import { ProgressBarComponent } from '@ng-verse/progress-bar/progress-bar.component';

@Component({
  selector: 'doc-show-case-progress-bar',
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
