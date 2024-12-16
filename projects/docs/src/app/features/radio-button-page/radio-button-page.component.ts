import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
        this.sourceTreeBuilder.file('radio-button-state', root),
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
}
