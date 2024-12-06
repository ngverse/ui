import { Component, inject } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CInstallationComponent } from '../../blueprint/c-installation/c-installation.component';
import { ButtonComponent } from '../../../../../ng-verse/src/public-api';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import { ApiInfoInputComponent } from '../../blueprint/api-info/api-info-input/api-info-input.component';
import { ApiInfoInputContainerComponent } from '../../blueprint/api-info/api-info-input-container/api-info-input-container.component';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { SimpleButtonComponent } from '../../../../../examples/src/lib/button/simple-button/simple-button.component';

@Component({
  selector: 'doc-button-page',
  imports: [
    BlueprintPageComponent,
    CInstallationComponent,
    ShowCaseComponent,
    ShowCaseComponent,
    ApiInfoComponent,
    ApiInfoInputComponent,
    ApiInfoInputContainerComponent,
    SourceTreeComponent,
    SimpleButtonComponent,
  ],
  templateUrl: './button-page.component.html',
  styleUrl: './button-page.component.scss',
})
export class ButtonPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree = this.sourceTreeBuilder.sourceTree('button', (root) => [
    this.sourceTreeBuilder.folder(
      root,
      root,
      () => this.sourceTreeBuilder.fullComponent('button', root),
      true
    ),
  ]);
}
