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

  subFolders(name: string): SourceTreeFolder {
    return {
      name: name,
      files: [...this.sourceTreeBuilder.fullComponent(name, `${ROOT}/${name}`)],
    };
  }

  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [...this.sourceTreeBuilder.fullComponent(ROOT, ROOT)],
      hideName: true,
    },
    this.subFolders('card-header'),
    this.subFolders('card-title'),
    this.subFolders('card-description'),
    this.subFolders('card-content'),
    this.subFolders('card-footer'),
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'CardComponent',
        type: 'component',
        selector: 'app-card',
        description: 'The main component of card',
      },
      {
        name: 'CardHeaderComponent',
        type: 'component',
        selector: 'app-card-header',
        description: 'Renders the header of a card component.',
      },
      {
        name: 'CardTitleComponent',
        type: 'component',
        selector: 'app-card-title',
        description: 'Renders the title of a card component.',
      },
      {
        name: 'CardDescriptionComponent',
        type: 'component',
        selector: 'app-card-description',
        description: 'Renders the description of a card component.',
      },
      {
        name: 'CardContentComponent',
        type: 'component',
        selector: 'app-card-content',
        description: 'Renders the content of a card component.',
      },
      {
        name: 'CardFooterComponent',
        type: 'component',
        selector: 'app-card-footer',
        description: 'Renders the footer of a card component.',
      },
    ],
  };
}
