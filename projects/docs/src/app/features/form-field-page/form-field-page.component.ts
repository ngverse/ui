import { Component, inject } from '@angular/core';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import {
    ApiInfo,
    ApiInputsComponent,
    EMPTY_API_INPUT_DEFAULT_VALUE,
} from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseFormFieldComponent } from '../../examples/form-field/show-case-form-field/show-case-form-field.component';

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
  sourceTree = this.sourceTreeBuilder.sourceTree('form-field', (root) => [
    this.sourceTreeBuilder.folder(
      root,
      root,
      () => this.sourceTreeBuilder.fullComponent('form-field', root),
      true
    ),
  ]);

  apiInputs: ApiInfo[] = [
    {
      name: 'button',
      inputs: [
        {
          name: 'color',
          type: 'primary | secondary | danger | success',
          description: "Defines the button's color type",
          default: 'primary',
        },
        {
          name: 'size',
          type: 'sm | md | lg',
          description: 'changes the size of the button',
          default: 'md',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'disables the button',
          default: 'false',
        },
        {
          name: 'type',
          type: 'submit | reset | button',
          description: 'sets the native button type attribute',
          default: EMPTY_API_INPUT_DEFAULT_VALUE,
        },
        {
          name: 'loading',
          type: 'boolean',
          description:
            'adds spinner on the button. The button will not emit any event while loading is true',
          default: 'false',
        },
      ],
    },
  ];
}
