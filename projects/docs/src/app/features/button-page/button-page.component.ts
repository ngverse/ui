import { Component, inject } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import {
  ApiInputs,
  ApiInputsComponent,
  EMPTY_API_INPUT_DEFAULT_VALUE,
} from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { ShowCaseButtonComponent } from '../../examples/button/show-case-button/show-case-button.component';

@Component({
  selector: 'doc-button-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseComponent,
    ApiInfoComponent,
    SourceTreeComponent,
    CommandInstallationComponent,
    ShowCaseButtonComponent,
    ApiInputsComponent,
  ],
  templateUrl: './button-page.component.html',
  styleUrl: './button-page.component.scss',
})
export class ButtonPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree = this.sourceTreeBuilder.sourceTree('button', (root) => [
    this.sourceTreeBuilder.folder(
      root,
      root,
      () => this.sourceTreeBuilder.fullComponent('button', root),
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
          description:
            "Defines the button's color type, which affects its background style.",
          default: 'primary',
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
