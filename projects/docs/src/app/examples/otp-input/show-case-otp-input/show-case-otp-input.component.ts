import { Component, inject, signal, viewChild } from '@angular/core';
import { ButtonComponent } from '../../../@/ui/button/button.component';
import { OtpInputComponent } from '../../../@/ui/otp-input/otp-input.component';
import { ToastService } from '../../../@/ui/toast/toast.service';

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
