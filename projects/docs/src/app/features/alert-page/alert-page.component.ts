import { Component, inject } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseAlertComponent } from '../../examples/show-case-alert/show-case-alert.component';

@Component({
  selector: 'doc-alert-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseAlertComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
  ],
  templateUrl: './alert-page.component.html',
  styleUrl: './alert-page.component.scss',
})
export class AlertPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree = this.sourceTreeBuilder.sourceTree('alert', (root) => [
    this.sourceTreeBuilder.folder(
      root,
      root,
      () => this.sourceTreeBuilder.fullComponent('alert', root),
      true
    ),
  ]);
}
