import { Component, inject } from '@angular/core';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { DependenciesInstallationComponent } from '../../blueprint/dependencies-installation/dependencies-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import {
  SourceTreeBuilder,
  SourceTreeFolder,
} from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseLoadingOverlayComponent } from '../../examples/loading-overlay/show-case-loading-overlay/show-case-loading-overlay.component';
const ROOT = 'loading-overlay';

@Component({
  selector: 'doc-loading-overlay-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
    ApiInfoComponent,
    ShowCaseLoadingOverlayComponent,
    SourceTreeComponent,
    DependenciesInstallationComponent,
  ],
  templateUrl: './loading-overlay-page.component.html',
  styleUrl: './loading-overlay-page.component.scss',
})
export class LoadingOverlayPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: 'loading-overlay',
      files: [...this.sourceTreeBuilder.fullComponent(ROOT, ROOT)],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
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
              "If true, the parent element's style is automatically set to relative. preserving absolute as is. If false, you must manually set the parent's position to relative or absolute for the loading overlay to fit correctly.",
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
    ],
  };
}
