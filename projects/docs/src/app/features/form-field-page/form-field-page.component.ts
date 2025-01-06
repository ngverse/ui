import { Component, inject } from '@angular/core';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import { ApiInputsComponent } from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import {
  SourceTreeBuilder,
  SourceTreeFolder,
} from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseFormFieldComponent } from '../../examples/form-field/show-case-form-field/show-case-form-field.component';
const ROOT = 'form-field';
@Component({
  selector: 'doc-form-field-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ApiInputsComponent,
    ApiInfoComponent,
    SourceTreeComponent,
    CommandInstallationComponent,
    ShowCaseFormFieldComponent,
  ],
  templateUrl: './form-field-page.component.html',
  styleUrl: './form-field-page.component.scss',
})
export class FormFieldPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: this.sourceTreeBuilder.fullComponent(ROOT, ROOT),
      hideName: true,
    },
    {
      name: 'label',
      files: this.sourceTreeBuilder.fullComponent('label', `${ROOT}/label`),
    },
    {
      name: 'error',
      files: this.sourceTreeBuilder.fullComponent('error', `${ROOT}/error`),
    },
    {
      name: 'error-group',
      files: this.sourceTreeBuilder.fullComponent(
        'error-group',
        `${ROOT}/error-group`
      ),
    },
  ];
}
