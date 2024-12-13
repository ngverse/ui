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
}
