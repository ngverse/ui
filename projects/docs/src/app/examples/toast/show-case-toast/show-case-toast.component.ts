import { Component, inject, OnInit } from '@angular/core';
import { ToastService } from '@ng-verse/toast/toast.service';

@Component({
  selector: 'doc-show-case-toast',
  imports: [],
  templateUrl: './show-case-toast.component.html',
  styleUrl: './show-case-toast.component.scss',
})
export class ShowCaseToastComponent implements OnInit {
  toastService = inject(ToastService);

  ngOnInit() {
    this.showToast();
  }

  showToast() {
    this.toastService.open({
      message: 'I AM TOASTTTT ' + new Date().toTimeString(),
      position: 'right_bottom',
    });
  }
}
