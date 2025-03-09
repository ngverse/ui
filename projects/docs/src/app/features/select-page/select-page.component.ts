import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { ShowCaseSelectComponent } from '../../examples/select/show-case-select/show-case-select.component';
const ROOT = 'select';
@Component({
  selector: 'doc-select-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ReactiveFormsModule,
    ShowCaseSelectComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    PrerequisitesComponent,
  ],
  templateUrl: './select-page.component.html',
  styleUrl: './select-page.component.css',
})
export class SelectPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [
        ...this.sourceTreeBuilder.fullComponent(ROOT, ROOT),
        ...this.sourceTreeBuilder.fullComponent('option', ROOT),
        this.sourceTreeBuilder.component('option-group', ROOT),
        this.sourceTreeBuilder.component('option-group-label', ROOT),
        this.sourceTreeBuilder.file('select-check-icon.component', ROOT),
        this.sourceTreeBuilder.file('select-icon.component', ROOT),
      ],
      hideName: true,
    },
  ];

  prerequisites: Prerequisite[] = [
    {
      name: 'popover',
      label: 'Popover',
    },
  ];

  apiInfo: ApiInfo = {
    ariaLink: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/',
    entities: [
      {
        name: 'SelectComponent',
        type: 'component',
        selector: 'app-select',
        formBindable: true,
        inputs: [
          {
            name: 'multiple',
            type: 'boolean',
            default: 'false',
            description:
              'determines whether the select allows multiple selection',
          },
          {
            name: 'placeholder',
            type: 'string',
            default: EMPTY_API_INPUT_DEFAULT_VALUE,
            description: 'determines the placeholder text',
          },
          {
            name: 'compareWith',
            type: '(o1: unknown, o2: unknown) => o1 === o2',
            default: 'o1 === o2',
            description: 'determines the compare function',
          },
          {
            name: 'stretch',
            type: 'boolean',
            default: 'false',
            description:
              'determines whether the select button should take the full width of the container',
          },
        ],
      },
      {
        name: 'OptionComponent',
        type: 'component',
        selector: 'app-option',
        inputs: [
          {
            name: 'value',
            type: 'unknown',
            description: 'The value of the option',
            default: EMPTY_API_INPUT_DEFAULT_VALUE,
          },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Determines whether the option is disabled',
            default: 'false',
          },
        ],
      },
      {
        name: 'SelectLabelDirective',
        type: 'directive',
        selector: 'ng-template[appSelectLabel]',
        description:
          'The label of the select, you can use this directive instead of label input, when you need more customization. The template context will be the options array',
      },
      {
        name: 'OptionGroupComponent',
        type: 'component',
        selector: 'app-option-group',
        description: 'Groups related options',
        inputs: [
          {
            name: 'label',
            type: 'string',
            description: 'The label of the option group',
            default: EMPTY_API_INPUT_DEFAULT_VALUE,
          },
        ],
      },
      {
        name: 'OptionGroupLabelComponent',
        type: 'component',
        selector: 'app-option-group-label',
        description:
          'The label of the option group, you can use this component instead of label input, when you need more customization',
      },
    ],
  };
}
