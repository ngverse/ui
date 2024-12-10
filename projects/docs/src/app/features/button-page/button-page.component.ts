import { Component, inject } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import { ApiInfoInputComponent } from '../../blueprint/api-info/api-info-input/api-info-input.component';
import { ApiInfoInputContainerComponent } from '../../blueprint/api-info/api-info-input-container/api-info-input-container.component';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseButtonComponent } from '../../../../../examples/src/lib/button/show-case-button/show-case-button.component';
import {
  ApiInputsComponent,
  ApiInputType,
} from '../../blueprint/api-info/api-inputs/api-inputs.component';

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

  apiInputs: ApiInputType[] = [
    {
      name: 'color',
      type: 'primary | secondary | danger | success',
      description:
        "Defines the button's color type, which affects its background style.",
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'disables the button',
    },
    {
      name: 'type',
      type: 'submit | reset | button',
      description: 'sets the native button type attribute',
    },
    {
      name: 'loading',
      type: 'boolean',
      description:
        'adds spinner on the button. The button will not emit any event while loading is true',
    },
  ];
}
