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
import { ShowCaseProgressSpinnerComponent } from '../../examples/progress-spinner/show-case-progress-spinner/show-case-progress-spinner.component';
const ROOT = 'progress-spinner';
@Component({
  selector: 'doc-progress-spinner-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseComponent,
    ApiInfoComponent,
    SourceTreeComponent,
    CommandInstallationComponent,
    ShowCaseProgressSpinnerComponent,
  ],
  templateUrl: './progress-spinner-page.component.html',
  styleUrl: './progress-spinner-page.component.scss',
})
export class ProgressSpinnerPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: 'progress-spinner',
      files: [...this.sourceTreeBuilder.fullComponent(ROOT, ROOT)],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'ProgressSpinnerComponent',
        selector: 'app-progress-spinner',
        type: 'component',
        inputs: [
          {
            name: 'radius',
            type: 'number',
            default: '50',
            description: 'The radius of the spinner.',
          },
        ],
      },
    ],
  };
}
