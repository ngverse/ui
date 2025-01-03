import { Component, inject } from '@angular/core';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import {
  ApiInputs,
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
import { ShowCaseSvgIconComponent } from '../../examples/svg-icon/show-case-svg-icon/show-case-svg-icon.component';

const ROOT = 'svg-icon';

@Component({
  selector: 'doc-svg-icon-page',
  imports: [
    ShowCaseSvgIconComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInputsComponent,
    ApiInfoComponent,
    BlueprintPageComponent,
    ShowCaseComponent
  ],
  templateUrl: './svg-icon-page.component.html',
  styleUrl: './svg-icon-page.component.scss',
})
export class SvgIconPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [...this.sourceTreeBuilder.fullComponent('svg-icon', ROOT)],
      hideName: true,
    },
  ];

  inputs: ApiInputs[] = [
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
