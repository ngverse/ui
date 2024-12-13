import { Component, inject } from '@angular/core';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { ShowCaseAccordionComponent } from '@examples/accordion/show-case-accordion/show-case-accordion.component';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import {
  ApiInputsComponent,
  ApiInputType,
} from '../../blueprint/api-info/api-inputs/api-inputs.component';

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

  accordionInputs: ApiInputType[] = [
    {
      name: 'multi',
      type: 'boolean',
      description: 'allows multiple panels to be open simultaneously',
      default: 'false',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'disables the button',
    },
    {
      name: 'type',
      type: 'submit | reset | button',
      description: 'sets the native button type attribute',
    },
    {
      name: 'loading',
      type: 'boolean',
      description:
        'adds spinner on the button. The button will not emit any event while loading is true',
    },
  ];

  accordionItemInputs: ApiInputType[] = [
    {
      name: 'disabled',
      type: 'boolean',
      description: 'disables accordion-item',
      default: 'false',
    },
  ];
}
