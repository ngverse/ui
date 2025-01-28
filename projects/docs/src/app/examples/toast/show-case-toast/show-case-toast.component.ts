import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@ngverse/button/button.component';
import { ToastService } from '@ngverse/toast/toast.service';

@Component({
  selector: 'doc-show-case-toast',
  imports: [ButtonComponent],
  templateUrl: './show-case-toast.component.html',
  styleUrl: './show-case-toast.component.scss',
})
export class ShowCaseToastComponent {
  toastService = inject(ToastService);

  showToast() {
    this.toastService.open({
      message: 'Current time is: ' + new Date().toLocaleTimeString(),
      closeDelay: 1000,
    });
  }
}
