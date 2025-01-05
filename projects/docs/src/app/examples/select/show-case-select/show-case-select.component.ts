import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectComponent } from '@ng-verse/select/select.component';

@Component({
  selector: 'doc-show-case-select',
  imports: [SelectComponent, ReactiveFormsModule],
  templateUrl: './show-case-select.component.html',
  styleUrl: './show-case-select.component.scss',
})
export class ShowCaseSelectComponent {
  options = new Array(100).fill(1).map((i) => Math.random());

  formControl = new FormControl(this.options[1], Validators.required);
}
