import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApiDescriptionComponent } from '../../blueprint/api-info/api-description/api-description.component';
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
import { ShowCaseLocalStorageComponent } from '../../examples/local-storage/show-case-local-storage/show-case-local-storage.component';

const ROOT = 'local-storage';

@Component({
  selector: 'doc-local-storage-page',
  imports: [
    BlueprintPageComponent,
    CommandInstallationComponent,
    ShowCaseComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    ShowCaseLocalStorageComponent,
    ApiDescriptionComponent,
  ],
  templateUrl: './local-storage-page.component.html',
  styleUrl: './local-storage-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocalStoragePageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [...this.sourceTreeBuilder.service(ROOT, ROOT)],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'LocalStorageService',
        type: 'service',
      },
    ],
  };
}
