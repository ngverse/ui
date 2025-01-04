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
import { ShowCaseBadgeComponent } from '../../examples/badge/show-case-badge/show-case-badge.component';
const ROOT = 'badge';
@Component({
  selector: 'doc-badge-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    ShowCaseBadgeComponent,
  ],
  templateUrl: './badge-page.component.html',
  styleUrl: './badge-page.component.scss',
})
export class BadgePageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  sourceTree: SourceTreeFolder[] = [
    {
      name: 'badge',
      files: [this.sourceTreeBuilder.directive(ROOT, ROOT), this.sourceTreeBuilder.component('badge-body', ROOT)],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'BadgeComponent',
        type: 'directive',
        selector: 'app-badge',
      },
      {
        name: 'BadgeBodyComponent',
        type: 'component',
        selector: 'app-badge-body',
      },
    ],
    description: `The Badge component is an placeholder used to indicate loading content.
    It can be styled with CSS to customize its size, shape.`,
  };
}
