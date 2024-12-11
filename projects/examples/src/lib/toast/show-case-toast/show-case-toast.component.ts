import { Component, inject } from '@angular/core';
import { ToastService } from '../../../../../ng-verse/src/lib/toast/toast.service';

@Component({
  selector: 'exp-show-case-toast',
  imports: [],
  templateUrl: './show-case-toast.component.html',
  styleUrl: './show-case-toast.component.scss',
})
export class ShowCaseToastComponent {
  toastService = inject(ToastService);

  showToast() {
    // setInterval(() => {
    //   this.toastService.open({
    //     message: 'I AM TOASTTTT ' + new Date().toTimeString(),
    //     position: 'right_center',
    //   });
    // }, 1000);
  }
}
