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
import { ShowCaseListboxComponent } from '../../examples/listbox/show-case-listbox/show-case-listbox.component';

const ROOT = 'listbox';

@Component({
  selector: 'doc-listbox-page',
  imports: [
    BlueprintPageComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    ShowCaseComponent,
    ShowCaseListboxComponent,
  ],
  templateUrl: './listbox-page.component.html',
  styleUrl: './listbox-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListboxPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [
        ...this.sourceTreeBuilder.directive(ROOT, ROOT, true),
        ...this.sourceTreeBuilder.directive('listbox-item', ROOT, true),
        this.sourceTreeBuilder.file('listbox-key-manager', ROOT, 'ts'),
        this.sourceTreeBuilder.file('listbox-key-manager', ROOT, 'spec.ts'),
        this.sourceTreeBuilder.file('listbox-registry', ROOT, 'ts'),
        this.sourceTreeBuilder.file('listbox-registry', ROOT, 'spec.ts'),
      ],
      hideName: true,
    },
  ];
  apiInfo: ApiInfo = {
    entities: [],
  };
}
