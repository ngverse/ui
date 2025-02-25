import { Component, inject, signal, viewChild } from '@angular/core';
import { ButtonComponent } from '../../../../../../ngverse/src/lib/button/button.component';
import { OtpInputComponent } from '../../../../../../ngverse/src/lib/otp-input/otp-input.component';
import { ToastService } from '../../../../../../ngverse/src/lib/toast/toast.service';

@Component({
  selector: 'doc-show-case-otp-input',
  imports: [OtpInputComponent, ButtonComponent],
  templateUrl: './show-case-otp-input.component.html',
  styleUrl: './show-case-otp-input.component.css',
})
export class ShowCaseOtpInputComponent {
  loading = signal(false);
  otpInput = viewChild.required(OtpInputComponent);
  toast = inject(ToastService);

  codeFilled(code: string) {
    this.toast.open({
      message: `Code filled: ${code}`,
      showCloseIcon: false,
    });
  }

  recieveCode() {
    this.loading.set(true);

    setTimeout(() => {
      this.otpInput().fillFromText('1234');
      this.loading.set(false);
    }, 1000);
  }
}
