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
import { ShowCaseAccordionComponent } from '../../examples/accordion/show-case-accordion/show-case-accordion.component';

const ROOT = 'accordion';

@Component({
  selector: 'doc-accordion-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseComponent,
    ApiInfoComponent,
    SourceTreeComponent,
    ShowCaseAccordionComponent,
    CommandInstallationComponent,
  ],
  templateUrl: './accordion-page.component.html',
  styleUrl: './accordion-page.component.scss',
})
export class AccordionPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [
        ...this.sourceTreeBuilder.fullComponent('accordion', ROOT),
        ...this.sourceTreeBuilder.fullComponent('accordion-item', ROOT),
        this.sourceTreeBuilder.component('accordion-header', ROOT),
        this.sourceTreeBuilder.component('accordion-body', ROOT),
        this.sourceTreeBuilder.component('expand-icon', ROOT),
        this.sourceTreeBuilder.file('accordion-animations', ROOT),
      ],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'AccordionComponent',
        selector: 'app-accordion',
        type: 'component',
        inputs: [
          {
            name: 'multi',
            type: 'boolean',
            description: 'allows multiple panels to be open simultaneously',
            default: 'false',
          },
        ],
      },
      {
        name: 'AccordionItemComponent',
        selector: 'app-accordion-item',
        type: 'component',
        inputs: [
          {
            name: 'label',
            type: 'string',
            description: 'label of the accordion-item',
            default: EMPTY_API_INPUT_DEFAULT_VALUE,
          },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'disables accordion-item',
            default: 'false',
          },
          {
            name: 'expanded',
            type: 'boolean',
            description: 'opens the accordion-item',
            default: 'false',
          },
        ],
      },
      {
        name: 'AccordionBodyComponent',
        selector: 'app-accordion-body',
        type: 'component',
        description:
          'The component is used within an accordion-item to render its ng-content.',
        inputs: [],
      },
      {
        name: 'AccordionHeaderComponent',
        selector: 'app-accordion-header',
        type: 'component',
        description:
          'The component can replace the label inside an accordion item and uses ng-content to render its content.',
        inputs: [],
      },
    ],
  };
}
