import { Component, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '@ng-verse/checkbox/checkbox.component';

@Component({
  selector: 'doc-show-case-checkbox',
  imports: [ReactiveFormsModule, CheckboxComponent, FormsModule],
  templateUrl: './show-case-checkbox.component.html',
  styleUrl: './show-case-checkbox.component.scss',
})
export class ShowCaseCheckboxComponent {
  value = model();
}
