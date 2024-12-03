import { Component } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { CheckboxComponent } from '../../../../../ng-verse/src/lib/checkbox/checkbox.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'doc-checkbox-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    CheckboxComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './checkbox-page.component.html',
  styleUrl: './checkbox-page.component.scss',
})
export class CheckboxPageComponent {
  formControl = new FormControl(false, Validators.required);

  constructor() {
    this.formControl.valueChanges.subscribe(() => {
      console.log(this.formControl.value);
    });
  }
}
