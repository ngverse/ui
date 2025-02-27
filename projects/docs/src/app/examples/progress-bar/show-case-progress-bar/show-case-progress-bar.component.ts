import { ProgressBarComponent } from '@/ui/progress-bar/progress-bar.component';
import { Platform } from '@angular/cdk/platform';
import { afterNextRender, Component, inject, signal } from '@angular/core';

@Component({
  selector: 'doc-show-case-progress-bar',
  imports: [ProgressBarComponent],
  templateUrl: './show-case-progress-bar.component.html',
  styleUrl: './show-case-progress-bar.component.css',
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
