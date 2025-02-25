import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { ShowCaseLoaderComponent } from '../../examples/loader/show-case-loader/show-case-loader.component';
const ROOT = 'loader';
@Component({
  selector: 'doc-loader-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseLoaderComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
  ],
  templateUrl: './loader-page.component.html',
  styleUrl: './loader-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderPageComponent {
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
        name: 'LoaderComponent',
        type: 'component',
        selector: 'app-loader',
        inputs: [
          {
            name: 'radius',
            type: 'number',
            default: '50',
            description: 'The radius of the spinner.',
          },
          {
            name: 'overlay',
            type: 'boolean',
            default: 'false',
            description:
              'If overlay is set to true, it adds a background overlay that stretches to the size of the parent element.',
          },
          {
            name: 'userParent',
            type: 'boolean',
            default: 'true',
            description:
              "If true, the parent element's style is automatically set to relative. If false, you must explicitly set it to either relative or absolute. this input is needed when overlay=[true]",
          },
          {
            name: 'transparency',
            type: 'none | semi | full',
            default: 'semi',
            description: 'The transparency of the spinner background overlay',
          },
        ],
      },
    ],
  };
}
