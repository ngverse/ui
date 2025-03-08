import { ButtonComponent } from '@/ui/button/button.component';
import { DialogService } from '@/ui/dialog/dialog.service';
import { ErrorComponent } from '@/ui/form-field/error.component';
import { FormFieldErrorRegistry } from '@/ui/form-field/form-field-error.registry';
import { FormFieldComponent } from '@/ui/form-field/form-field.component';
import { LabelComponent } from '@/ui/form-field/label.component';
import { InputDirective } from '@/ui/input/input.directive';
import { OptionComponent } from '@/ui/select/option.component';
import { SelectComponent } from '@/ui/select/select.component';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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
  styleUrl: './show-case-form-field.component.css',
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
