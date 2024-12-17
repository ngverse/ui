import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseSwitchComponent } from '../../examples/switch/show-case-switch/show-case-switch.component';

@Component({
  selector: 'doc-switch-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    FormsModule,
    ShowCaseSwitchComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
  ],
  templateUrl: './switch-page.component.html',
  styleUrl: './switch-page.component.scss',
})
export class SwitchPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree = this.sourceTreeBuilder.sourceTree('switch', (root) => [
    this.sourceTreeBuilder.folder(
      root,
      root,
      () => this.sourceTreeBuilder.fullComponent('switch', root),
      true
    ),
  ]);
}
