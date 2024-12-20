import { Component, inject } from '@angular/core';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import {
  ApiInputs,
  ApiInputsComponent,
  EMPTY_API_INPUT_DEFAULT_VALUE,
} from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseInputComponent } from '../../examples/input/show-case-input/show-case-input.component';

@Component({
  selector: 'doc-input-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseInputComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    ApiInputsComponent,
  ],
  templateUrl: './input-page.component.html',
  styleUrl: './input-page.component.scss',
})
export class InputPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree = this.sourceTreeBuilder.sourceTree('input', (root) => [
    this.sourceTreeBuilder.folder(
      root,
      root,
      () => this.sourceTreeBuilder.fullComponent('input', root),
      true
    ),
  ]);

  apiInputs: ApiInputs[] = [
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
