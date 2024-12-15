import { Component, inject } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseCheckboxComponent } from '../../examples/checkbox/show-case-checkbox/show-case-checkbox.component';

@Component({
  selector: 'doc-checkbox-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ReactiveFormsModule,
    ShowCaseCheckboxComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
  ],
  templateUrl: './checkbox-page.component.html',
  styleUrl: './checkbox-page.component.scss',
})
export class CheckboxPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree = this.sourceTreeBuilder.sourceTree('checkbox', (root) => [
    this.sourceTreeBuilder.folder(
      'checkbox',
      root,
      (root) => [
        ...this.sourceTreeBuilder.fullComponent('checkbox', root),
        this.sourceTreeBuilder.file('checkbox-icon.component', root),
      ],
      true
    ),
  ]);
}
