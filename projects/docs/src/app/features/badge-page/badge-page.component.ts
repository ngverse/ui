import { Component, inject } from '@angular/core';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import { EMPTY_API_INPUT_DEFAULT_VALUE } from '../../blueprint/api-info/api-inputs/api-inputs.component';
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
      files: [this.sourceTreeBuilder.directive(ROOT, ROOT)],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'BadgeComponent',
        type: 'directive',
        selector: '[appBadge]',
        inputs: [
          {
            name: 'appBadge',
            type: 'number | string | null | undefined',
            description: 'text to display in badge',
            default: EMPTY_API_INPUT_DEFAULT_VALUE,
          },
          {
            name: 'hideBadge',
            type: 'boolean',
            description: 'hides the badge',
            default: 'false',
          },
        ],
      },
    ],
  };
}
