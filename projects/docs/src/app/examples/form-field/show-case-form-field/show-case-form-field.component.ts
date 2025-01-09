import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { DialogService } from '@ng-verse/dialog/dialog.service';
import { ErrorGroupComponent } from '@ng-verse/form-field/error-group/error-group.component';
import { ErrorComponent } from '@ng-verse/form-field/error/error.component';
import { FormFieldComponent } from '@ng-verse/form-field/form-field.component';
import { LabelComponent } from '@ng-verse/form-field/label/label.component';
import { InputComponent } from '@ng-verse/input/input.component';
import { OptionComponent } from '@ng-verse/select/option/option.component';
import { SelectComponent } from '@ng-verse/select/select.component';

@Component({
  selector: 'doc-show-case-form-field',
  imports: [
    FormFieldComponent,
    LabelComponent,
    InputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    ErrorComponent,
    ErrorGroupComponent,
    SelectComponent,
    OptionComponent,
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
    email: ['', Validators.compose([Validators.required, Validators.email])],
    age: ['', Validators.required],
    country: [undefined, Validators.required],
  });

  countries = [
    { code: 'KA', name: 'Georgia' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' },
    { code: 'AU', name: 'Australia' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'CN', name: 'China' },
  ];

  register() {
    this.dialog.alert({
      title: 'Registration',
      description: 'User registered successfully',
    });
  }
}
