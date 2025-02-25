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
import { ShowCaseProgressBarComponent } from '../../examples/progress-bar/show-case-progress-bar/show-case-progress-bar.component';
const ROOT = 'progress-bar';

@Component({
  selector: 'doc-progress-bar-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseProgressBarComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
  ],
  templateUrl: './progress-bar-page.component.html',
  styleUrl: './progress-bar-page.component.css',
})
export class ProgressBarPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: this.sourceTreeBuilder.fullComponent(ROOT, ROOT),
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'ProgressBarComponent',
        selector: 'app-progress-bar',
        type: 'component',
        inputs: [
          {
            name: 'indeterminate',
            type: 'boolean',
            default: 'false',
            description: 'show an indeterminate progress bar',
          },
        ],
      },
    ],
  };
}
