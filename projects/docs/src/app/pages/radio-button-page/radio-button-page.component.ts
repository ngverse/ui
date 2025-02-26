import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import {
  AUTO_GENERATED_API_DEFAULT_VALUE,
  EMPTY_API_INPUT_DEFAULT_VALUE,
} from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import {
  SourceTreeBuilder,
  SourceTreeFolder,
} from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseRadioButtonComponent } from '../../examples/radio-button/show-case-radio-button/show-case-radio-button.component';
const ROOT = 'radio-button';
@Component({
  selector: 'doc-radio-button-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ReactiveFormsModule,
    ShowCaseRadioButtonComponent,
    SourceTreeComponent,
    ApiInfoComponent,
  ],
  templateUrl: './radio-button-page.component.html',
  styleUrl: './radio-button-page.component.css',
})
export class RadioButtonPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: 'radio-button',
      files: [
        ...this.sourceTreeBuilder.fullComponent(ROOT, ROOT),
        this.sourceTreeBuilder.component('radio-button-icon', ROOT),
        ...this.sourceTreeBuilder.fullComponent('radio-group', ROOT),
      ],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'radio-group',
        selector: 'app-radio-group',
        type: 'component',
        formBindable: true,
        inputs: [
          {
            name: 'vertical',
            type: 'boolean',
            description: 'displays radio-buttons vertically',
            default: 'false',
          },
          {
            name: 'name',
            type: 'string',
            description:
              'Sets name attribute of the all inner input[type="radio"]',
            default: AUTO_GENERATED_API_DEFAULT_VALUE,
          },
          {
            name: 'compareWith',
            type: '(o1: any, o2: any) => boolean',
            description:
              'Function to compare the option values with the selected values. The first argument is a value from an option. The second is a value from the selection',
            default: '(o1, o2) => o1 === o2',
          },
        ],
      },
      {
        name: 'radio-button',
        selector: 'app-radio-button',
        type: 'component',
        inputs: [
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Disables the radio-button',
            default: 'false',
          },
          {
            name: 'id',
            type: 'string',
            description: 'Sets id attribute to the input[type="radio"]',
            default: AUTO_GENERATED_API_DEFAULT_VALUE,
          },
          {
            name: 'value',
            type: 'any',
            description: 'Sets the value of radio-button',
            default: EMPTY_API_INPUT_DEFAULT_VALUE,
          },
        ],
      },
    ],
  };
}
