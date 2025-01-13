import { Platform } from '@angular/cdk/platform';
import { Component, inject, signal } from '@angular/core';
import { ProgressBarComponent } from '@ng-verse/progress-bar/progress-bar.component';

@Component({
  selector: 'doc-show-case-progress-bar',
  imports: [ProgressBarComponent],
  templateUrl: './show-case-progress-bar.component.html',
  styleUrl: './show-case-progress-bar.component.scss',
})
export class ShowCaseProgressBarComponent {
  value = signal<number>(0);
  platform = inject(Platform);

  constructor() {
    if (this.platform.isBrowser) {
      setInterval(() => {
        this.value.update((val) => val + 1);
      }, 100);
    }
  }
}
