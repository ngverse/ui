import { Component, inject } from '@angular/core';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import { EMPTY_API_INPUT_DEFAULT_VALUE } from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import {
  Prerequisite,
  PrerequisitesComponent,
} from '../../blueprint/prerequisites/prerequisites.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import {
  SourceTreeBuilder,
  SourceTreeFolder,
} from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseDialogComponent } from '../../examples/dialog/show-case-dialog/show-case-dialog.component';

const ROOT = 'dialog';
@Component({
  selector: 'doc-dialog-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseDialogComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    PrerequisitesComponent,
  ],
  templateUrl: './dialog-page.component.html',
  styleUrl: './dialog-page.component.css',
})
export class DialogPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  prerequisites: Prerequisite[] = [
    {
      name: 'button',
      label: 'Button',
    },
  ];
  sourceTree: SourceTreeFolder[] = [
    {
      name: '/',
      files: [
        ...this.sourceTreeBuilder.service('dialog', ROOT),
        ...this.sourceTreeBuilder.directive('dialog-close', `${ROOT}`, true),
        this.sourceTreeBuilder.component('dialog-close-icon', `${ROOT}`),
      ],
      hideName: true,
    },
    {
      name: `dialog`,
      files: [
        ...this.sourceTreeBuilder.fullComponent('dialog', `${ROOT}/dialog`),
      ],
    },
    {
      name: `alert-dialog`,
      files: [
        ...this.sourceTreeBuilder.fullComponent(
          'alert-dialog',
          `${ROOT}/alert-dialog`
        ),
      ],
    },
    {
      name: `confirm-dialog`,
      files: [
        ...this.sourceTreeBuilder.fullComponent(
          'confirm-dialog',
          `${ROOT}/confirm-dialog`
        ),
      ],
    },
  ];

  apiInfo: ApiInfo = {
    ariaLink: 'https://material.angular.io/cdk/dialog/overview#accessibility',
    entities: [
      {
        name: 'DialogService',
        type: 'service',
        description: 'service that opens a dialog',
        methods: [
          {
            name: 'dialog',
            description: 'opens the dialog',
            returnType: 'DialogReturn<T>',
            params: [
              {
                name: 'component',
                type: 'ComponentType<unknown>',
                description: 'component to render inside the dialog.',
              },
              {
                name: 'options',
                type: 'object',
                fields: [
                  {
                    name: 'data',
                    type: 'unknown',
                    description: 'data to pass to the component.',
                  },
                  {
                    name: 'title',
                    type: 'string',
                    description: 'title of the drawer.',
                  },
                  {
                    name: 'hasBackdrop',
                    type: 'boolean',
                    description: 'whether the dialog has a backdrop.',
                    default: 'true',
                  },
                  {
                    name: 'disableClose',
                    type: 'boolean',
                    description:
                      'whether the dialog closes with the escape key or pointer events outside the panel element.',
                    default: 'false',
                  },
                  {
                    name: 'showClose',
                    type: 'boolean',
                    description: 'whether to show close icon',
                    default: 'true',
                  },
                ],
              },
            ],
          },
          {
            name: 'confirm',
            description: 'opens a confirm dialog',
            returnType: 'DialogReturn<T>',
            params: [
              {
                name: 'options',
                type: 'object',
                fields: [
                  {
                    name: 'title',
                    type: 'string',
                    description: 'title of the dialog.',
                  },
                  {
                    name: 'description',
                    type: 'string',
                    description: 'description of the dialog.',
                  },
                  {
                    name: 'yesLabel',
                    type: 'string',
                    description: 'confirm button label',
                    default: 'Yes',
                  },
                  {
                    name: 'noLabel',
                    type: 'string',
                    description: 'cancel/reject button label',
                    default: 'No',
                  },
                ],
              },
            ],
          },
          {
            name: 'alert',
            description: 'opens a alert dialog',
            returnType: 'DialogReturn<T>',
            params: [
              {
                name: 'options',
                type: 'object',
                fields: [
                  {
                    name: 'title',
                    type: 'string',
                    description: 'title of the alert dialog.',
                  },
                  {
                    name: 'description',
                    type: 'string',
                    description: 'description of the alert dialog.',
                  },
                  {
                    name: 'buttonLabel',
                    type: 'string',
                    description: 'alert button label',
                    default: 'OK',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'DialogCloseDirective',
        selector: '[appDialogClose]',
        type: 'directive',
        description:
          'A directive used to close the dialog. It can be placed on any element inside the dialog.',
        inputs: [
          {
            name: 'appDialogClose',
            type: 'unknown',
            description: 'value to pass to the close method',
          },
        ],
      },
      {
        name: 'ConfirmDirective',
        selector: '[appConfirm]',
        type: 'directive',
        description:
          'A directive used to open a confirm dialog. It can be placed on any element.',
        inputs: [
          {
            name: 'confirmOptions',
            type: `{title: string;
  description: string;
  yesLabel?: string;
  noLabel?: string;}`,
            description: 'object with options for the confirm',
            default: EMPTY_API_INPUT_DEFAULT_VALUE,
          },
        ],
        outputs: [
          {
            name: 'approved',
            description: 'emits when the dialog is approved',
            value: 'void',
          },
          {
            name: 'rejected',
            description: 'emits when the dialog is rejected',
            value: 'void',
          },
        ],
      },
    ],
  };
}
