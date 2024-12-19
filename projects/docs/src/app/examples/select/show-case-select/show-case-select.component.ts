import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { OptionComponent } from '@ng-verse/select/option/option.component';
import { SelectComponent } from '@ng-verse/select/select.component';

@Component({
  selector: 'doc-show-case-select',
  imports: [SelectComponent, OptionComponent, ReactiveFormsModule],
  templateUrl: './show-case-select.component.html',
  styleUrl: './show-case-select.component.scss',
})
export class ShowCaseSelectComponent {
  options = ['one', 'two', 'three'];

  formControl = new FormControl(null, Validators.required);
}
