import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@ngverse/button/button.component';
import { DialogService } from '@ngverse/dialog/dialog.service';
import { ErrorGroupComponent } from '@ngverse/form-field/error-group/error-group.component';
import { ErrorComponent } from '@ngverse/form-field/error/error.component';
import { FormFieldErrorRegistry } from '@ngverse/form-field/form-field-error.registry';
import { FormFieldComponent } from '@ngverse/form-field/form-field.component';
import { LabelComponent } from '@ngverse/form-field/label/label.component';
import { InputComponent } from '@ngverse/input/input.component';
import { OptionComponent } from '@ngverse/select/option.component';
import { SelectComponent } from '@ngverse/select/select.component';

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
  private formFieldErrorRegistry = inject(FormFieldErrorRegistry);

  group = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    age: ['', Validators.compose([Validators.required, Validators.min(10)])],
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

  constructor() {
    this.formFieldErrorRegistry.addErrors({
      min: (error) =>
        `Min value is ${error.min}, but your value is ${error.actual}`,
    });
  }

  register() {
    this.dialog.alert({
      title: 'Registration',
      description: 'User registered successfully',
    });
  }
}
