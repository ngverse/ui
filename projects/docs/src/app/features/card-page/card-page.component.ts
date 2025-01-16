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
import { ShowCaseCardComponent } from '../../examples/card/show-case-card/show-case-card.component';
const ROOT = 'card';

@Component({
  selector: 'doc-card-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    ShowCaseCardComponent,
  ],
  templateUrl: './card-page.component.html',
  styleUrl: './card-page.component.scss',
})
export class CardPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [...this.sourceTreeBuilder.fullComponent(ROOT, ROOT)],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'CardComponent',
        type: 'component',
        selector: 'app-card',
        description: `The card has no default CSS display value, eliminating conflicts with CSS priorities during customization.`,
        inputs: [
          {
            name: 'outline',
            type: 'boolean',
            description: 'adds border',
            default: 'true',
          },
          {
            name: 'surface',
            type: 'boolean',
            description: 'adds background color',
            default: 'false',
          },
          {
            name: 'shadow',
            type: 'boolean',
            description: 'adds shadow',
            default: 'false',
          },
          {
            name: 'gap',
            type: 'boolean',
            description: 'adds padding',
            default: 'true',
          },
        ],
      },
    ],
  };
}
