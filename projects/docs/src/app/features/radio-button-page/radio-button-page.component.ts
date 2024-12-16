import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioButtonComponent } from '../../../../../ng-verse/src/lib/radio-button/radio-button.component';
import { RadioGroupComponent } from '../../../../../ng-verse/src/lib/radio-button/radio-group/radio-group.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';

@Component({
  selector: 'doc-radio-button-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    RadioButtonComponent,
    ReactiveFormsModule,
    RadioGroupComponent,
  ],
  templateUrl: './radio-button-page.component.html',
  styleUrl: './radio-button-page.component.scss',
})
export class RadioButtonPageComponent {
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
