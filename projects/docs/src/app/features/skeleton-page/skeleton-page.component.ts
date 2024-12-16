import { Component, inject } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { SkeletonComponent } from '../../../../../ng-verse/src/lib/skeleton/skeleton.component';
import { ShowCaseSkeletonComponent } from '../../examples/skeleton/show-case-skeleton/show-case-skeleton.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ApiInputsComponent } from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { ApiDescriptionComponent } from "../../blueprint/api-info/api-description/api-description.component";

@Component({
  selector: 'doc-skeleton-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
    ShowCaseSkeletonComponent,
    SourceTreeComponent,
    ApiInputsComponent,
    ApiInfoComponent,
    ApiDescriptionComponent
],
  templateUrl: './skeleton-page.component.html',
  styleUrl: './skeleton-page.component.scss',
})
export class SkeletonPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  sourceTree = this.sourceTreeBuilder.sourceTree('skeleton', (root) => [
    this.sourceTreeBuilder.folder(
      root,
      root,
      () => this.sourceTreeBuilder.fullComponent('skeleton', root),
      true
    ),
  ]);
}
