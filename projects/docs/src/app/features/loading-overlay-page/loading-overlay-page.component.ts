import { Component, inject } from '@angular/core';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import {
  ApiInputs,
  ApiInputsComponent,
} from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseLoadingOverlayComponent } from '../../examples/loading-overlay/show-case-loading-overlay/show-case-loading-overlay.component';

@Component({
  selector: 'doc-loading-overlay-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
    ApiInputsComponent,
    ApiInfoComponent,
    ShowCaseLoadingOverlayComponent,
    SourceTreeComponent,
  ],
  templateUrl: './loading-overlay-page.component.html',
  styleUrl: './loading-overlay-page.component.scss',
})
export class LoadingOverlayPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree = this.sourceTreeBuilder.sourceTree('loading-overlay', (root) => [
    this.sourceTreeBuilder.folder(
      root,
      root,
      () => this.sourceTreeBuilder.fullComponent('loading-overlay', root),
      true
    ),
  ]);

  apiInputs: ApiInputs[] = [
    {
      name: 'loading-overlay',
      inputs: [
        {
          name: 'loading',
          type: 'boolean',
          description: 'Displays the loading-overlay',
          default: 'false',
        },
        {
          name: 'useParent',
          type: 'boolean',
          description:
            "Automatically sets the parent element's style to relative if true, preserving absolute as is. If false, you must explicitly set the parent element's position to relative or absolute for the loading overlay to stretch to the parent.",
          default: 'true',
        },

        {
          name: 'spinnerRadius',
          type: 'number',
          description: 'the radius of inner progress-spinner',
          default: '50',
        },
        {
          name: 'background',
          type: 'full | semi | none',
          description: 'transparency of the overlay background',
          default: 'semi',
        },
      ],
    },
  ];
}
