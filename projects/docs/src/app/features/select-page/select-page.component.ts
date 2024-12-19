import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ShowCaseSelectComponent } from '../../examples/select/show-case-select/show-case-select.component';

@Component({
  selector: 'doc-select-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ReactiveFormsModule,
    ShowCaseSelectComponent,
  ],
  templateUrl: './select-page.component.html',
  styleUrl: './select-page.component.scss',
})
export class SelectPageComponent {}
