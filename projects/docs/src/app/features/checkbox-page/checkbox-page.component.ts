import { Component, inject } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseCheckboxComponent } from '../../examples/checkbox/show-case-checkbox/show-case-checkbox.component';
import {
  ApiInputs,
  ApiInputsComponent,
  AUTO_GENERATED_API_DEFAULT_VALUE,
} from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';

@Component({
  selector: 'doc-checkbox-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ReactiveFormsModule,
    ShowCaseCheckboxComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    ApiInputsComponent,
  ],
  templateUrl: './checkbox-page.component.html',
  styleUrl: './checkbox-page.component.scss',
})
export class CheckboxPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree = this.sourceTreeBuilder.sourceTree('checkbox', (root) => [
    this.sourceTreeBuilder.folder(
      'checkbox',
      root,
      (root) => [
        ...this.sourceTreeBuilder.fullComponent('checkbox', root),
        this.sourceTreeBuilder.file('checkbox-icon.component', root),
      ],
      true
    ),
  ]);

  apiInputs: ApiInputs[] = [
    {
      name: 'checkbox',
      inputs: [
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables the checkbox',
          default: 'false',
        },
        {
          name: 'required',
          type: 'boolean',
          description: 'Adds required validation to the checkbox',
          default: 'false',
        },
        {
          name: 'id',
          type: 'string',
          description: 'Sets id attribute to the native checkbox',
          default: AUTO_GENERATED_API_DEFAULT_VALUE,
        },
      ],
    },
  ];
}
