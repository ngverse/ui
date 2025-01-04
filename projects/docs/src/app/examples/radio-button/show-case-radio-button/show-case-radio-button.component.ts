import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RadioButtonComponent } from '@ng-verse/radio-button/radio-button.component';
import { RadioGroupComponent } from '@ng-verse/radio-button/radio-group/radio-group.component';

@Component({
  selector: 'doc-show-case-radio-button',
  imports: [
    RadioButtonComponent,
    RadioGroupComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './show-case-radio-button.component.html',
  styleUrl: './show-case-radio-button.component.scss',
})
export class ShowCaseRadioButtonComponent {
  values = [
    {
      firstName: 'Apple',
      price: 30,
    },
    {
      firstName: 'Orange',
      price: 70,
    },
    {
      firstName: 'Cherry',
      price: 100,
    },
  ];
  formControl = new FormControl(null, Validators.required);

  compare(o1: { price: number }, o2: { price: number }) {
    return o1?.price === o2.price;
  }
}
