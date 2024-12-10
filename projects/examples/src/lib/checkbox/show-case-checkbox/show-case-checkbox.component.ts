import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxComponent } from '../../../../../ng-verse/src/lib/checkbox/checkbox.component';

@Component({
  selector: 'exp-show-case-checkbox',
  imports: [ReactiveFormsModule, CheckboxComponent],
  templateUrl: './show-case-checkbox.component.html',
  styleUrl: './show-case-checkbox.component.scss',
})
export class ShowCaseCheckboxComponent {
  formControl = new FormControl(false, Validators.required);
}
