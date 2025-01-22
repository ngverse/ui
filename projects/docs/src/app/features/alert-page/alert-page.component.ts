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
import { ShowCaseAlertComponent } from '../../examples/alert/show-case-alert/show-case-alert.component';

const ROOT = 'alert';

@Component({
  selector: 'doc-alert-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseAlertComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
  ],
  templateUrl: './alert-page.component.html',
  styleUrl: './alert-page.component.scss',
})
export class AlertPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [...this.sourceTreeBuilder.fullComponent('alert', ROOT)],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'AlertComponent',
        selector: 'app-alert',
        type: 'component',
        inputs: [
          {
            name: 'type',
            type: 'success | danger | warning | none',
            default: 'default',
            description: 'defines the type of alert',
          },
        ],
      },
      {
        name: 'AlertHeaderComponent',
        selector: 'app-alert-header',
        type: 'component',
        description: 'Renders the header of an alert component.',
      },
      {
        name: 'AlertBodyComponent',
        selector: 'app-alert-body',
        type: 'component',
        description: 'Renders the body of an alert component.',
      },
    ],
  };
}
