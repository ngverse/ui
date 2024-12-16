import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioButtonComponent } from '@ng-verse/radio-button/radio-button.component';
import { RadioGroupComponent } from '@ng-verse/radio-button/radio-group/radio-group.component';

@Component({
  selector: 'doc-show-case-radio-button',
  imports: [RadioButtonComponent, RadioGroupComponent, ReactiveFormsModule],
  templateUrl: './show-case-radio-button.component.html',
  styleUrl: './show-case-radio-button.component.scss',
})
export class ShowCaseRadioButtonComponent {
  formControl = new FormControl(null, Validators.required);
  values = [
    {
      firstName: 'luka',
      age: 30,
    },
    {
      firstName: 'onik',
      age: 40,
    },
  ];

  compare(o1: { age: number }, o2: { age: number }) {
    return o1?.age === o2?.age;
  }
}
