import { Component } from '@angular/core';
import { OtpInputComponent } from '../../../../../../ng-verse/src/lib/otp-input/otp-input.component';

@Component({
  selector: 'doc-show-case-otp-input',
  imports: [OtpInputComponent],
  templateUrl: './show-case-otp-input.component.html',
  styleUrl: './show-case-otp-input.component.scss',
})
export class ShowCaseOtpInputComponent {
  codeFilled(code: string) {
    console.log('CODE FILED ', code);
  }
}
