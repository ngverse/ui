import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { DialogService } from '@ng-verse/dialog/dialog.service';
import { ErrorComponent } from '@ng-verse/form-field/error/error.component';
import { FormFieldComponent } from '@ng-verse/form-field/form-field.component';
import { LabelComponent } from '@ng-verse/form-field/label/label.component';
import { InputComponent } from '@ng-verse/input/input.component';
import { ErrorGroupComponent } from "../../../../../../ng-verse/src/lib/form-field/error-group/error-group.component";

@Component({
  selector: 'doc-show-case-form-field',
  imports: [
    FormFieldComponent,
    LabelComponent,
    InputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    ErrorComponent,
    ErrorGroupComponent
],
  templateUrl: './show-case-form-field.component.html',
  styleUrl: './show-case-form-field.component.scss',
})
export class ShowCaseFormFieldComponent {
  formBuilder = inject(FormBuilder);
  dialog = inject(DialogService);

  group = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.email],
    age: ['', Validators.required],
  });

  register() {
    this.dialog.alert({
      title: 'Registration',
      description: 'User registered successfully',
    });
  }
}
