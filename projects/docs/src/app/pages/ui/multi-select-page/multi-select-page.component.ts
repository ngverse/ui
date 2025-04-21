import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiDescriptionComponent } from '../../../blueprint/api-info/api-description/api-description.component';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../../blueprint/api-info/api-info.component';
import { EMPTY_API_INPUT_DEFAULT_VALUE } from '../../../blueprint/api-info/api-inputs/api-inputs.component';
import { BlueprintPageComponent } from '../../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../../blueprint/command-installation/command-installation.component';
import {
  Prerequisite,
  PrerequisitesComponent,
} from '../../../blueprint/prerequisites/prerequisites.component';
import { ShowCaseComponent } from '../../../blueprint/show-case/show-case.component';
import {
  SourceTreeBuilder,
  SourceTreeFolder,
} from '../../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../../blueprint/source-tree/source-tree.component';
import { ShowCaseMultiSelectComponent } from '../../../examples/multi-select/show-case-multi-select/show-case-multi-select.component';
const ROOT = 'multi-select';
@Component({
  selector: 'doc-multi-select-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseMultiSelectComponent,
    CommandInstallationComponent,
    PrerequisitesComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    ApiDescriptionComponent,
    RouterLink,
  ],
  templateUrl: './multi-select-page.component.html',
  styleUrl: './multi-select-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [
        ...this.sourceTreeBuilder.fullComponent(ROOT, ROOT),
        ...this.sourceTreeBuilder.fullComponent('multi-option', ROOT),
        this.sourceTreeBuilder.component('multi-option-group', ROOT),
        this.sourceTreeBuilder.component('multi-option-group-label', ROOT),
      ],
      hideName: true,
    },
  ];

  prerequisites: Prerequisite[] = [
    {
      name: 'popover',
      label: 'Popover',
    },
    {
      name: 'font-icon',
      label: 'Font Icon',
    },
  ];

  apiInfo: ApiInfo = {
    ariaLink: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/',
    entities: [
      {
        name: 'MultiSelectComponent',
        type: 'component',
        selector: 'app-multi-select',
        formBindable: true,
        inputs: [
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
          {
            name: 'emptyText',
            type: 'string',
            default: EMPTY_API_INPUT_DEFAULT_VALUE,
            description:
              'determines the empty text to be displayed when no options are available',
          },
        ],
      },
      {
        name: 'MultiOptionComponent',
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
        name: 'MultiSelectLabelDirective',
        type: 'directive',
        selector: 'ng-template[appMultiSelectLabel]',
        description:
          'The label of the select, you can use this directive instead of label input, when you need more customization. The template context will be the selected options',
      },
      {
        name: 'MultiOptionContentDirective',
        type: 'directive',
        selector: '[appMultiOptionContent]',
        description: `The content of the option, you can use this directive when your option includes different text content and you want to use specific text as a select label`,
      },
      {
        name: 'MultiOptionGroupComponent',
        type: 'component',
        selector: 'app-multi-option-group',
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
        name: 'MultiOptionGroupLabelComponent',
        type: 'component',
        selector: 'app-multi-option-group-label',
        description:
          'The label of the option group, you can use this component instead of label input, when you need more customization',
      },
    ],
  };
}
