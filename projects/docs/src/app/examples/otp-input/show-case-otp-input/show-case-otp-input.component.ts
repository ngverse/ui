import { Component, signal } from '@angular/core';
import { OtpInputComponent } from 'ngverse/otp-input/otp-input.component';

@Component({
  selector: 'doc-show-case-otp-input',
  imports: [OtpInputComponent],
  templateUrl: './show-case-otp-input.component.html',
  styleUrl: './show-case-otp-input.component.scss',
})
export class ShowCaseOtpInputComponent {
  code = signal<string | undefined>(undefined);
  codeFilled(code: string) {
    this.code.set(code);
  }
}
