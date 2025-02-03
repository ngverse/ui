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
import { ShowCaseFormFieldComponent } from '../../examples/form-field/show-case-form-field/show-case-form-field.component';
const ROOT = 'form-field';
@Component({
  selector: 'doc-form-field-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    SourceTreeComponent,
    CommandInstallationComponent,
    ShowCaseFormFieldComponent,
    ApiInfoComponent,
  ],
  templateUrl: './form-field-page.component.html',
  styleUrl: './form-field-page.component.scss',
})
export class FormFieldPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [
        ...this.sourceTreeBuilder.fullComponent(ROOT, ROOT),
        this.sourceTreeBuilder.file('form-field-error.registry', ROOT),
        this.sourceTreeBuilder.file(
          'form-field-error.registry',
          ROOT,
          'spec.ts'
        ),
      ],
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
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'FormFieldComponent',
        type: 'component',
        selector: 'app-form-field',
        description: 'A form field is a block element with field and label',
        inputs: [
          {
            name: 'showErrors',
            type: 'boolean',
            default: 'true',
            description:
              'Whether to show auto generated errors, custom errors will be still shown, it has to be controlled manually.',
          },
          {
            name: 'silentErrors',
            type: 'string[] | undefined',
            default: EMPTY_API_INPUT_DEFAULT_VALUE,
            description:
              'List of errors to ignore. This can be useful when you want to display most of the errors with error group, but handle specific errors with app-error and provide customized error messages',
          },
        ],
      },
      {
        name: 'LabelComponent',
        type: 'component',
        selector: 'app-label',
        description: 'Form Field label',
      },
      {
        name: 'ErrorComponent',
        type: 'component',
        selector: 'app-error',
        description: 'app-error displays an error message',
      },
      {
        name: 'FormFieldErrorRegistry',
        type: 'service',
        description: 'Service for registering error messages',
        methods: [
          {
            name: 'addErrors',
            returnType: 'void',
            description: 'adds errors to the registry',
            params: [
              {
                name: 'errors',
                type: 'Record<string, string | ((params: unknown) => string)>',
                description:
                  'message value can be string or function where error object will be passed',
              },
            ],
          },
          {
            name: 'setErrors',
            returnType: 'void',
            description:
              'clears existing errors and sets new errors to the registry',

            params: [
              {
                name: 'errors',
                type: 'Record<string, string | ((params: unknown) => string)>',
                description:
                  'message value can be string or function where error object will be passed',
              },
            ],
          },
          {
            name: 'getMessage',
            returnType: 'string | undefined',
            description: 'gets error message by code',
            params: [
              {
                name: 'code',
                type: 'string',
                description: 'error code',
              },
            ],
          },
        ],
      },
    ],
  };
}
