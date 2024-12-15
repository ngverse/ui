import { Component } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ShowCaseOtpInputComponent } from '../../examples/otp-input/show-case-otp-input/show-case-otp-input.component';

@Component({
  selector: 'doc-otp-input-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseOtpInputComponent,
  ],
  templateUrl: './otp-input-page.component.html',
  styleUrl: './otp-input-page.component.scss',
})
export class OtpInputPageComponent {}
