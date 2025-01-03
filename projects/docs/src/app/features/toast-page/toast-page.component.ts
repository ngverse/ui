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
import { ShowCaseToastComponent } from '../../examples/toast/show-case-toast/show-case-toast.component';

@Component({
  selector: 'doc-toast-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseToastComponent,
    SourceTreeComponent,
    CommandInstallationComponent,
    ApiInfoComponent,
    ApiInputsComponent,
  ],
  templateUrl: './toast-page.component.html',
  styleUrl: './toast-page.component.scss',
})
export class ToastPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree = this.sourceTreeBuilder.sourceTree('toast', (root) => [
    this.sourceTreeBuilder.folder(
      root,
      root,
      () => [
        ...this.sourceTreeBuilder.fullComponent('toast', root),
        this.sourceTreeBuilder.file('toast.service', root),
        this.sourceTreeBuilder.file('toast-animations', root),
        this.sourceTreeBuilder.component('toast-close', root),
      ],
      true
    ),
  ]);

  apiInputs: ApiInfo[] = [
    {
      name: 'ToastOptions',
      inputs: [
        {
          name: 'message',
          type: 'string',
          description: 'text to display',
          default: EMPTY_API_INPUT_DEFAULT_VALUE,
        },

        {
          name: 'position',
          type: `top_left
  | top_center
  | top_right
  | right_center
  | right_bottom
  | bottom_center
  | bottom_left
  | left_center`,
          description: 'Defines where to put the toast',
          default: 'right_bottom',
        },
        {
          name: 'showCloseIcon',
          type: 'boolean',
          description: 'Shows close icon',
          default: 'true',
        },
        {
          name: 'autoClose',
          type: 'boolean',
          description:
            'Automatically closes the toast when the closeDelay expires.',
          default: 'true',
        },
        {
          name: 'closeDelay',
          type: 'number',
          description:
            'The duration (in milliseconds) to wait before automatically closing the toast.',
          default: '3000ms',
        },
        {
          name: 'action',
          type: 'string',
          description:
            'Adds the action value as a class to the toast element, allowing you to apply styles based on the action type, such as "success" or "error".',
          default: 'action',
        },
      ],
    },
  ];
}
