import { Component, inject } from '@angular/core';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import {
  ApiEntity,
  ApiInputsComponent,
} from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import {
  SourceTreeBuilder,
  SourceTreeFolder,
} from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseIconComponent } from '../../examples/icon/show-case-icon/show-case-icon.component';

const ROOT = 'icon';

@Component({
  selector: 'doc-icon-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseIconComponent,
    ShowCaseComponent,
    ApiInputsComponent,
    SourceTreeComponent,
    CommandInstallationComponent,
    ApiInfoComponent,
  ],
  templateUrl: './icon-page.component.html',
  styleUrl: './icon-page.component.scss',
})
export class IconPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [...this.sourceTreeBuilder.fullComponent('icon', ROOT)],
      hideName: true,
    },
  ];

  inputs: ApiEntity[] = [
    {
      name: 'AlertComponent',
      selector: 'app-alert',
      type: 'component',
      inputs: [
        {
          name: 'type',
          type: 'default | success | danger | warning',
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
  ];
}
