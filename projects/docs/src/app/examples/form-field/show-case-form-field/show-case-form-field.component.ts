import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { DialogService } from '@ng-verse/dialog/dialog.service';
import { ErrorComponent } from '@ng-verse/form-field/error/error.component';
import { FormFieldErrorRegistry } from '@ng-verse/form-field/form-field-error.registry';
import { FormFieldComponent } from '@ng-verse/form-field/form-field.component';
import { LabelComponent } from '@ng-verse/form-field/label/label.component';
import { InputDirective } from '@ng-verse/input/input.directive';
import { OptionComponent } from '@ng-verse/select/option.component';
import { SelectComponent } from '@ng-verse/select/select.component';

@Component({
  selector: 'doc-show-case-form-field',
  imports: [
    FormFieldComponent,
    LabelComponent,
    InputDirective,
    ReactiveFormsModule,
    ButtonComponent,
    ErrorComponent,
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

    effect(() => {
      const cont = this.group.controls.lastName;
      console.log(cont.errors?.['required']);
    });
  }

  register() {
    this.dialog.alert({
      title: 'Registration',
      description: 'User registered successfully',
    });
  }
}
