import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../../../ng-verse/src/lib/select/select.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';

@Component({
  selector: 'doc-select-page',
  imports: [
    SelectComponent,
    BlueprintPageComponent,
    ShowCaseComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './select-page.component.html',
  styleUrl: './select-page.component.scss',
})
export class SelectPageComponent {
  options = ['one', 'two', 'three'];

  formControl = new FormControl('two');
}
