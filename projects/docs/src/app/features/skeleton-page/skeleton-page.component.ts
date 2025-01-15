import { Component, inject } from '@angular/core';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import {
  SourceTreeBuilder,
  SourceTreeFolder,
} from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseSkeletonComponent } from '../../examples/skeleton/show-case-skeleton/show-case-skeleton.component';
const ROOT = 'skeleton';
@Component({
  selector: 'doc-skeleton-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
    ShowCaseSkeletonComponent,
    SourceTreeComponent,
    ApiInfoComponent,
  ],
  templateUrl: './skeleton-page.component.html',
  styleUrl: './skeleton-page.component.scss',
})
export class SkeletonPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  sourceTree: SourceTreeFolder[] = [
    {
      name: 'skeleton',
      files: [...this.sourceTreeBuilder.inlineComponent(ROOT, ROOT)],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'SkeletonComponent',
        type: 'component',
        selector: 'app-skeleton',
        description: `The Skeleton component is an placeholder used to indicate loading content.
        It can be styled with CSS to customize its size, shape.`,
      },
    ],
  };
}
