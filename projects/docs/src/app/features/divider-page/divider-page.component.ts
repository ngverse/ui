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
import { ShowCaseDividerComponent } from '../../examples/divider/show-case-divider/show-case-divider.component';

const ROOT = 'divider';
@Component({
  selector: 'doc-divider-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    ShowCaseDividerComponent,
  ],
  templateUrl: './divider-page.component.html',
  styleUrl: './divider-page.component.css',
})
export class DividerPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  sourceTree: SourceTreeFolder[] = [
    {
      name: 'divider',
      files: [...this.sourceTreeBuilder.fullInlineComponent(ROOT, ROOT)],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    ariaLink:
      'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role',
    entities: [
      {
        name: 'DividerComponent',
        type: 'component',
        selector: 'app-divider',
        inputs: [
          {
            name: 'vertical',
            type: 'boolean',
            description: 'Specifies whether the divider is vertical.',
            default: 'false',
          },
        ],
      },
    ],
  };
}
