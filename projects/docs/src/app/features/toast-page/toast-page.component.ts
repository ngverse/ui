import { Component, inject } from '@angular/core';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import { EMPTY_API_INPUT_DEFAULT_VALUE } from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import {
  SourceTreeBuilder,
  SourceTreeFolder,
} from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseToastComponent } from '../../examples/toast/show-case-toast/show-case-toast.component';

const ROOT = 'toast';

@Component({
  selector: 'doc-toast-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseToastComponent,
    SourceTreeComponent,
    CommandInstallationComponent,
    ApiInfoComponent,
  ],
  templateUrl: './toast-page.component.html',
  styleUrl: './toast-page.component.scss',
})
export class ToastPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: 'toast',
      files: [
        ...this.sourceTreeBuilder.fullComponent(ROOT, ROOT),
        ...this.sourceTreeBuilder.service('toast', ROOT),
        this.sourceTreeBuilder.component('toast-close', ROOT),
      ],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'ToastService',
        type: 'service',
        description: 'Service for toast',
        methods: [
          {
            name: 'open',
            returnType: 'Observable<void>',
            returnDescription:
              'returns observable that emits when the toast is closed',
            description: 'Opens the toast',
            params: [
              {
                name: 'options',
                type: 'object',
                fields: [
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
                    name: 'type',
                    type: 'default | success | warning | danger',
                    description: 'Type of the toast',
                    default: 'defaukt',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}
