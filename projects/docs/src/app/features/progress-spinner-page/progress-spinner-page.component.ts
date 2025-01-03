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
import { ShowCaseProgressSpinnerComponent } from "../../examples/progress-spinner/show-case-progress-spinner/show-case-progress-spinner.component";

@Component({
  selector: 'doc-progress-spinner-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseComponent,
    ApiInfoComponent,
    SourceTreeComponent,
    CommandInstallationComponent,
    ApiInputsComponent,
    ShowCaseProgressSpinnerComponent
],
  templateUrl: './progress-spinner-page.component.html',
  styleUrl: './progress-spinner-page.component.scss',
})
export class ProgressSpinnerPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree = this.sourceTreeBuilder.sourceTree('button', (root) => [
    this.sourceTreeBuilder.folder(
      root,
      root,
      () => this.sourceTreeBuilder.fullComponent('button', root),
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
