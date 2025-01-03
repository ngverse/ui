import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import {
    ApiInfo,
    ApiInputsComponent,
    AUTO_GENERATED_API_DEFAULT_VALUE,
    EMPTY_API_INPUT_DEFAULT_VALUE,
} from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseRadioButtonComponent } from '../../examples/radio-button/show-case-radio-button/show-case-radio-button.component';

@Component({
  selector: 'doc-radio-button-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ReactiveFormsModule,
    ShowCaseRadioButtonComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    ApiInputsComponent,
  ],
  templateUrl: './radio-button-page.component.html',
  styleUrl: './radio-button-page.component.scss',
})
export class RadioButtonPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree = this.sourceTreeBuilder.sourceTree('radio-button', (root) => [
    this.sourceTreeBuilder.folder(
      root,
      root,
      () => [
        ...this.sourceTreeBuilder.fullComponent('radio-button', root),
        this.sourceTreeBuilder.component('radio-button-icon', root),
        this.sourceTreeBuilder.file('radio-button.state', root),
      ],
      true
    ),
    this.sourceTreeBuilder.folder('radio-group', root, () => [
      ...this.sourceTreeBuilder.fullComponent(
        'radio-group',
        `${root}/radio-group`
      ),
    ]),
  ]);

  apiInputs: ApiInfo[] = [
    {
      name: 'radio-group',
      inputs: [
        {
          name: 'direction',
          type: 'horizontal | vertical',
          description: 'Defines the direction of radio-buttons',
          default: 'horizontal',
        },
        {
          name: 'name',
          type: 'string',
          description: 'Sets name attribute to the native checkbox',
          default: AUTO_GENERATED_API_DEFAULT_VALUE,
        },
        {
          name: 'compareWith',
          type: '(o1: any, o2: any) => boolean',
          description:
            'Function to compare the option values with the selected values. The first argument is a value from an option. The second is a value from the selection',
          default: '(o1, o2) => o1 === o2',
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
    {
      name: 'radio-button',
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
          description: 'Sets id attribute to the native radio-button',
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
  ];
}
