import { Component, signal } from '@angular/core';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { LoadingOverlayComponent } from '@ng-verse/loading-overlay/loading-overlay.component';

@Component({
  selector: 'doc-show-case-loading-overlay',
  imports: [LoadingOverlayComponent, ButtonComponent],
  templateUrl: './show-case-loading-overlay.component.html',
  styleUrl: './show-case-loading-overlay.component.scss',
})
export class ShowCaseLoadingOverlayComponent {
  showLoading = signal(false);

  show() {
    this.showLoading.set(true);
    setTimeout(() => {
      this.showLoading.set(false);
    }, 3000);
  }
}
