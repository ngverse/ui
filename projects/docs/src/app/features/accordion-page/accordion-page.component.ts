import { Component, inject } from '@angular/core';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import {
  ApiInputs,
  ApiInputsComponent,
} from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { ShowCaseAccordionComponent } from '../../examples/accordion/show-case-accordion/show-case-accordion.component';

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
    ApiInputsComponent,
  ],
  templateUrl: './accordion-page.component.html',
  styleUrl: './accordion-page.component.scss',
})
export class AccordionPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree = this.sourceTreeBuilder.sourceTree('accordion', (root) => [
    this.sourceTreeBuilder.folder(
      root,
      root,
      () => [
        ...this.sourceTreeBuilder.fullComponent('accordion', root),
        ...this.sourceTreeBuilder.fullComponent('accordion-item', root),
        this.sourceTreeBuilder.component('accordion-header', root),
        this.sourceTreeBuilder.component('accordion-body', root),
        this.sourceTreeBuilder.component('expand-icon', root),
        this.sourceTreeBuilder.file('accordion-animations', root),
      ],
      true
    ),
  ]);

  inputs: ApiInputs[] = [
    {
      name: 'accordion',
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
      name: 'accordion-item',
      inputs: [
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
  ];
}
