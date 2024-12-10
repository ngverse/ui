import { Component, inject } from '@angular/core';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { AccordionComponent } from '../../../../../ng-verse/src/lib/accordion/accordion.component';
import { AccordionItemComponent } from '../../../../../ng-verse/src/lib/accordion/accordion-item/accordion-item.component';
import { AccordionHeaderComponent } from '../../../../../ng-verse/src/lib/accordion/accordion-item/accordion-header.component';
import { AccordionBodyComponent } from '../../../../../ng-verse/src/lib/accordion/accordion-item/accordion-body.component';
import { SourceCodeComponent } from '../../blueprint/source-code/source-code.component';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';

@Component({
  selector: 'doc-accordion-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseComponent,
    ApiInfoComponent,
    AccordionComponent,
    AccordionItemComponent,
    AccordionHeaderComponent,
    AccordionBodyComponent,
    SourceTreeComponent,
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
      () => this.sourceTreeBuilder.fullComponent('accordion', root),
      true
    ),
    this.sourceTreeBuilder.folder(
      'accordion-item',
      `${root}/accordion-item`,
      (root) => [
        ...this.sourceTreeBuilder.fullComponent('accordion-item', root),
        this.sourceTreeBuilder.component('accordion-header', root),
        this.sourceTreeBuilder.component('accordion-body', root),
        this.sourceTreeBuilder.component('expand-icon', root),
        this.sourceTreeBuilder.file('animations', root),
      ]
    ),
  ]);

  items = [
    {
      title: 'Frequently Asked Questions',
      description:
        'Find answers to the most commonly asked questions about our product and services.',
    },
    {
      title: 'Key Features and Benefits',
      description:
        'Discover the unique features that set our product apart and how they can benefit you.',
    },
    {
      title: 'How to Get Started',
      description:
        'A step-by-step guide on setting up your account and making the most of our platform.',
    },
    {
      title: 'Troubleshooting Tips',
      description:
        'Common issues and quick solutions to help you get back on track without a hitch.',
    },
    {
      title: 'Product Specifications',
      description:
        'Detailed technical specifications of our product, including dimensions, materials, and performance capabilities.',
    },
  ];
}
