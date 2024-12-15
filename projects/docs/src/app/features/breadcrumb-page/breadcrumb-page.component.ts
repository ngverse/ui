import { Component, inject } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { ShowCaseBreadcrumbComponent } from '../../../../../examples/src/lib/examples/show-case-breadcrumb/show-case-breadcrumb.component';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';

@Component({
  selector: 'doc-breadcrumb-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ShowCaseBreadcrumbComponent,
  ],
  templateUrl: './breadcrumb-page.component.html',
  styleUrl: './breadcrumb-page.component.scss',
})
export class BreadcrumbPageComponent {
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
