import { Component } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowCaseCheckboxComponent } from '../../../../../examples/src/lib/checkbox/show-case-checkbox/show-case-checkbox.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';

@Component({
  selector: 'doc-checkbox-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ReactiveFormsModule,
    ShowCaseCheckboxComponent,
    CommandInstallationComponent,
  ],
  templateUrl: './checkbox-page.component.html',
  styleUrl: './checkbox-page.component.scss',
})
export class CheckboxPageComponent {}
