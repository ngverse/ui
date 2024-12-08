import { Component, inject } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import { ApiInfoInputComponent } from '../../blueprint/api-info/api-info-input/api-info-input.component';
import { ApiInfoInputContainerComponent } from '../../blueprint/api-info/api-info-input-container/api-info-input-container.component';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { SimpleButtonComponent } from '../../../../../examples/src/lib/button/simple-button/simple-button.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';

@Component({
  selector: 'doc-button-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseComponent,
    ApiInfoComponent,
    ApiInfoInputComponent,
    ApiInfoInputContainerComponent,
    SourceTreeComponent,
    SimpleButtonComponent,
    CommandInstallationComponent,
  ],
  templateUrl: './button-page.component.html',
  styleUrl: './button-page.component.scss',
})
export class ButtonPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  // sourceTree = this.sourceTreeBuilder.sourceTree('button', (root) => [
  //   this.sourceTreeBuilder.folder(
  //     root,
  //     root,
  //     () => this.sourceTreeBuilder.fullComponent('button', root),
  //     true
  //   ),
  // ]);

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
