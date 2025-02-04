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
import { ShowCasePaginationComponent } from '../../examples/pagination/show-case-pagination/show-case-pagination.component';

const ROOT = 'pagination';
@Component({
  selector: 'doc-pagination-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    ShowCasePaginationComponent,
  ],
  templateUrl: './pagination-page.component.html',
  styleUrl: './pagination-page.component.scss',
})
export class PaginationPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  sourceTree: SourceTreeFolder[] = [
    {
      name: 'pagination',
      files: [
        ...this.sourceTreeBuilder.inlineComponent(ROOT, ROOT),
        this.sourceTreeBuilder.file('pagination-next-icon.component', ROOT),
        this.sourceTreeBuilder.file('pagination-prev-icon.component', ROOT),
      ],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'PaginationComponent',
        type: 'component',
        selector: 'app-pagination',
        inputs: [
          {
            name: 'currentPage',
            type: 'number',
            description: 'Specifies the current page',
          },
          {
            name: 'totalPages',
            type: 'number',
            description: 'Specifies the total pages',
          },
        ],
        outputs: [
          {
            name: 'pageChange',
            description:
              'Emits when the page has been changed with the new page number',
            value: 'number',
          },
        ],
      },
    ],
  };
}
