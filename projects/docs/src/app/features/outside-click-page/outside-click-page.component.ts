import { Component, inject } from '@angular/core';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CInstallationComponent } from '../../blueprint/c-installation/c-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import {} from '../../blueprint/source-tree/source-tree-select/source-tree-select.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { ButtonComponent } from '../../../../../ng-verse/src/lib/button/button.component';

@Component({
  selector: 'doc-outside-click-page',
  imports: [
    BlueprintPageComponent,
    CInstallationComponent,
    ShowCaseComponent,
    ButtonComponent,
    ShowCaseComponent,
    ApiInfoComponent,
    SourceTreeComponent,
  ],
  templateUrl: './outside-click-page.component.html',
  styleUrl: './outside-click-page.component.scss',
})
export class OutsideClickPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree = this.sourceTreeBuilder.sourceTree('outside-click', (root) => [
    this.sourceTreeBuilder.folder(
      root,
      root,
      () => [this.sourceTreeBuilder.directive(root, root)],
      true
    ),
  ]);
}
