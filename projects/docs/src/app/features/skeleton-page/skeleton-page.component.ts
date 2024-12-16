import { Component, inject } from '@angular/core';
import { ApiDescriptionComponent } from "../../blueprint/api-info/api-description/api-description.component";
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseSkeletonComponent } from '../../examples/skeleton/show-case-skeleton/show-case-skeleton.component';

@Component({
  selector: 'doc-skeleton-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
    ShowCaseSkeletonComponent,
    SourceTreeComponent,
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
