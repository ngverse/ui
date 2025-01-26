import { Platform } from '@angular/cdk/platform';
import { afterNextRender, Component, inject, signal } from '@angular/core';
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
    afterNextRender(() => {
      setInterval(() => {
        this.value.update((val) => val + 10);
      }, 1000);
    });
  }
}
