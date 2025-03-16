import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import { EMPTY_API_INPUT_DEFAULT_VALUE } from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import {
  Prerequisite,
  PrerequisitesComponent,
} from '../../blueprint/prerequisites/prerequisites.component';
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
    PrerequisitesComponent,
    RouterLink,
  ],
  templateUrl: './pagination-page.component.html',
  styleUrl: './pagination-page.component.css',
})
export class PaginationPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  prerequisites: Prerequisite[] = [
    {
      name: 'button',
      label: 'Button',
    },
  ];

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
    ariaLink: 'https://www.a11ymatters.com/pattern/pagination',
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
            default: EMPTY_API_INPUT_DEFAULT_VALUE,
          },
          {
            name: 'totalPages',
            type: 'number',
            description: 'Specifies the total pages',
            default: EMPTY_API_INPUT_DEFAULT_VALUE,
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
